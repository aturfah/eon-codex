"""Script to parse eon_raw files."""
from copy import deepcopy
import re
import json
import xml.etree.ElementTree as ET

def get_xml_root(filename):
    tree = ET.parse(filename)
    root = tree.getroot()
    return root


def list_to_dict(list_data, key, lower_flag=True):
    output = {}
    for val in list_data:
        out_key = val[key]
        if lower_flag:
            out_key = out_key.lower()

        if out_key in output:
            raise RuntimeError("Duplicate key: {}".format(out_key))

        output[out_key] = val

    return output


def generate_monster_vulnerability(table_node):
    """
    Sample Damage Table:
        <table class="ffaq">
            <tbody>
                <tr>
                    <th>Cut</th>
                    <th>Stab</th>
                    <th>Bash</th>
                </tr>
                <tr>
                    <td style="text-align: center;" colspan="">100%</td>
                    <td style="text-align: center;" colspan="">100%</td>
                    <td style="text-align: center;" colspan="">100%</td>
                </tr>
                <tr>
                    <th>Fire</th>
                    <th>Ice</th>
                    <th>Volt</th>
                </tr>
                <tr>
                    <td style="text-align: center;" colspan="">100%</td>
                    <td style="text-align: center;" colspan="">150%</td>
                    <td style="text-align: center;" colspan="">100%</td>
                </tr>
                <tr>
                    <th style="text-align: center;" colspan="3">Almighty</th>
                </tr>
                <tr>
                    <td style="text-align: center;" colspan="3">100%</td>
                </tr>
            </tbody>
        </table>
    
    Sample Vulnerability Table:
        <table class="ffaq">
            <tbody>
                <tr>
                    <th>Blind</th>
                    <th>Poison</th>
                    <th>Paralysis</th>
                    <th>Panic</th>
                    <th>Sleep</th>
                    <th>Curse</th>
                    <th>Petrification</th>
                </tr>
                <tr>
                    <td style="text-align: center;" colspan="">100%</td>
                    <td style="text-align: center;" colspan="">150%</td>
                    <td style="text-align: center;" colspan="">100%</td>
                    <td style="text-align: center;" colspan="">100%</td>
                    <td style="text-align: center;" colspan="">100%</td>
                    <td style="text-align: center;" colspan="">100%</td>
                    <td style="text-align: center;" colspan="">100%</td>
                </tr>
                <tr>
                    <th style="text-align: center;" colspan="4">Instant Death</th>
                    <th style="text-align: center;" colspan="3">Stun</th>
                </tr>
                <tr>
                    <td style="text-align: center;" colspan="4">100%</td>
                    <td style="text-align: center;" colspan="3">100%</td>
                </tr>
                <tr>
                    <th style="text-align: center;" colspan="2">Head Bind</th>
                    <th style="text-align: center;" colspan="3">Arm Bind</th>
                    <th style="text-align: center;" colspan="2">Leg Bind</th>
                </tr>
                <tr>
                    <td style="text-align: center;" colspan="2">100%</td>
                    <td style="text-align: center;" colspan="3">150%</td>
                    <td style="text-align: center;" colspan="2">100%</td>
                </tr>
            </tbody>
        </table>
    """
    output = {}
    tr_counter = 0
    cols = []
    for trow in table_node.find("tbody"):
        col_counter = 0
        for col in trow:
            if tr_counter in (0, 2, 4):
                # Add to columns
                cols.append(col.text)
            elif tr_counter in (1, 3, 5):
                # Set output value for the chosen column header
                output[cols[col_counter]] = int(col.text.replace("%", ""))
            col_counter += 1

        # Reset columns every time we update output
        if tr_counter in (1, 3, 5):
            cols = []
        tr_counter += 1

    return output


def generate_monster_drops(monster_data, item_data):
    output = []

    # Generate which monsters drop which item
    monster_item_drops = {}
    for item in item_data:
        monst_source = item.get("monster_source", None)
        item_name = item.get("name", "DOOT DOOT")
        conditional = item.get("conditional", False)

        if not monst_source:
            continue

        if monst_source not in monster_item_drops:
            monster_item_drops[monst_source] = {}

        if item_name not in monster_item_drops[monst_source]:
            monster_item_drops[monst_source][item_name] = {
                "name": item_name,
                "conditional": conditional
            }

    # Link those up to results
    for monst_dat in monster_data:
        new_dat = deepcopy(monst_dat)
        drops = monster_item_drops.get(new_dat["name"].lower())
        if drops:
            new_dat["drops"] = drops

        output.append(new_dat)

    return output


def generate_monster_data(bquote_node, monst_cat, monst_loc):
    monst_name = None
    basic_stats = None
    dmg_vul = None
    ail_vul = None
    next_datum = None
    for obj in bquote_node:
        if obj.tag == "strong":
            monst_name = obj.text.strip()
            print(monst_name)
        elif obj.tag == 'p':
            # Check what next datum is going to be
            for sub_obj in obj:
                next_datum = sub_obj.text.strip().lower()
                break
        elif next_datum and obj.tag == 'table':
            print("FOUND TABLE: {}".format(next_datum))
            if "stats" in next_datum:
                continue
            elif "damage" in next_datum:
                dmg_vul = generate_monster_vulnerability(obj)
            elif "disable" in next_datum:
                ail_vul = generate_monster_vulnerability(obj)

            next_datum = None
        else:
            continue

    # Manually map bosses to non-world-map locations
    monst_loc_processed = monst_loc
    if monst_cat == "Bosses":
        lower_name = monst_name.lower()
        # Main Bosses
        if lower_name == "blossombeast":
            monst_loc_processed = "Eastern Shrine"
        elif lower_name in ["berserker king", "cernunnos", "healing roller"]:
            monst_loc_processed = "Lush Woodlands"
        elif lower_name == "wyvern":
            monst_loc_processed = "Primitive Jungle"
        elif lower_name == "wicked silurus":
            monst_loc_processed = "Waterfall Wood"
        elif lower_name in ["shellbeast", "dark skull"]:
            monst_loc_processed = "Southern Shrine"
        elif lower_name == "harpuia":
            monst_loc_processed = "Petal Bridge"
        elif lower_name == "chimaera":
            monst_loc_processed = "Ancient Forest"
        elif lower_name == "ketos":
            monst_loc_processed = "Undersea Grotto"
        elif lower_name == "bugbeast":
            monst_loc_processed = "Western Shrine"
        elif lower_name in ["salamander", "baby salamander", "boiling lizard", "scale"]:
            monst_loc_processed = "Golden Lair"
        elif lower_name in ["basilisk", "basilisk eye", "iwaoropenelep"]:
            monst_loc_processed = "Sandy Barrens"
        elif lower_name == "blót":
            monst_loc_processed = "Northern Shrine"
        elif "jormungandr" in monst_name:
            monst_loc_processed = "Yggdrasil Labyrinth"
        elif lower_name == "abyssal princess":
            monst_loc_processed = "Abyssal Shrine"

        # Side-Dungeon bosses
        elif lower_name in ["furyhorn", "duteous fawn"]:
            monst_loc_processed = "Small Orchard"
        elif lower_name == "golem":
            monst_loc_processed = "Giant's Ruins"
        elif lower_name == "fenrir":
            monst_loc_processed = "Alpha Plains"
        elif lower_name in ["chameleon king", "lizard retainer"]:
            monst_loc_processed = "Untrodden Basin"
        elif lower_name == "alraune":
            monst_loc_processed = "Blossom Bridge"
        elif lower_name == "hippogryph":
            monst_loc_processed = "Buried Castle"
        elif lower_name == "queen ant":
            monst_loc_processed = "Seditious Colony"
        elif lower_name in ["lamia", "bind snake"]:
            monst_loc_processed = "Forest of the End"
        elif lower_name in ["scylla", "ruin creeper"]:
            monst_loc_processed = "Frigid Lake"
        elif lower_name == "juggernaut":
            monst_loc_processed = "Illusory Woods"


    monst_data = {
        "name": monst_name,
        "cat": monst_cat,
        "location": monst_loc_processed,
        "basicStats": basic_stats,
        "damageMod": dmg_vul,
        "ailmentMod": ail_vul
    }

    return monst_data


def parse_items_table(table_node):
    tbody = table_node[0]
    table_items = []

    for child in tbody:
        if child[0].tag == "th":
            continue

        item_name = child[0].text
        item_source = child[1].text
        item_price = child[2].text

        new_dict = {
            "name": item_name,
            "raw_source": item_source,
            "price": item_price
        }

        table_items.append(new_dict)

    return table_items


def parse_item_source(item_info, monster_data):
    new_item = deepcopy(item_info)
    raw_source = new_item["raw_source"].lower()

    conditional_drop = False
    monster_source = None
    item_loc = None
    take_flag = False
    mine_flag = False
    chop_flag = False

    # Figure out what kind of drop this is
    if "conditional drop" in raw_source:
        conditional_drop = True
        raw_source = raw_source.replace("conditional drop", "").strip()
    elif "take item" in raw_source:
        take_flag = True
        raw_source = re.sub(r"take item \d", "", raw_source).strip()
    elif "chop item" in raw_source:
        chop_flag = True
        raw_source = re.sub(r"chop item \d", "", raw_source).strip()
    elif "mine item" in raw_source:
        mine_flag = True
        raw_source = re.sub(r"mine item \d", "", raw_source).strip()
    else:
        raw_source = re.sub(r"drop \d", "", raw_source).strip()

    new_item["conditional"] = conditional_drop
    new_item["take_flag"] = take_flag
    new_item["chop_flag"] = chop_flag
    new_item["mine_flag"] = mine_flag

    # Figure out where it comes from
    if take_flag or mine_flag or chop_flag:
        item_loc = raw_source
    else:
        monster_source = raw_source
        if monster_source == "mimic":
            monster_source = "mimic aye-aye"

        monst_data = monster_data.get(monster_source, {})
        if not monst_data:
            raise RuntimeError("MONSTER DATA NOT FOUND: {}".format(monster_source))

        item_loc = monst_data["location"]

    conditional_drop_data = parse_conditional_drops()
    new_item["monster_source"] = monster_source
    new_item["location"] = item_loc
    if conditional_drop:
        new_item["cond_method"] = conditional_drop_data[monster_source.lower()]

    return new_item


def parse_conditional_drops():
    data = None
    with open("conditional.txt", "r") as cond_file:
        data = [line.strip() for line in cond_file.readlines()]

    output = {}
    for datum in data:
        monster, method = datum.split(": ")
        monster = str(monster).lower().strip()
        method = str(method).strip()

        if monster in output:
            raise RuntimeError("Duplicate Monsters in results")

        output[monster] = method

    return output


def parse_items(monster_data, filename="eon_items.html"):
    root = get_xml_root(filename)
    raw_items = []
    items = []

    for child in root:
        if child.tag == "h3" and child.text != "Monster Drops and Gather Materials":
            break
        elif child.tag == "table":
            raw_items.extend(parse_items_table(child))

    for raw_item in raw_items:
        items.append(parse_item_source(raw_item, monster_data))

    return items


def parse_monsters(filename="eon_enemies.html"):
    root = get_xml_root(filename)

    monst_cat = None
    monst_loc = None
    monsters = []

    for child in root:
        if child.tag == "h3":
            monst_cat = child.text
        elif child.tag == "h4":
            monst_loc = child.text
            monst_loc = monst_loc.replace(" (FOEs)", "")
        elif child.tag == "blockquote":
            monsters.append(generate_monster_data(child, monst_cat, monst_loc))

    return monsters, list_to_dict(monsters, "name")


def output_js(data, filename, var_name):
    new_file_data = """
    var {variable} = {data};
    export default {variable};
    """
    data = json.dumps(data)

    with open(filename, 'w') as nf:
        nf.write(new_file_data.format(variable=var_name,
                                      data=data))


if __name__ == "__main__":
    print("Parsing monster data...")
    monster_data, mn_data_dict = parse_monsters()

    print("Parsing item data...")
    item_data = parse_items(mn_data_dict)

    print("Parsing monster drops...")
    monster_data = generate_monster_drops(monster_data, item_data)

    print("Outputting files...")
    output_js(monster_data, "MonsterData.js", "monsterData")
    output_js(item_data, "ItemData.js", "itemData")