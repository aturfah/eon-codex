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

        output[out_key] = val

    return output


def generate_monster_data(bquote_node, monst_cat, monst_loc):
    monst_name = None
    for obj in bquote_node:
        if obj.tag == "strong":
            monst_name = obj.text.strip()
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
        "loc": monst_loc_processed
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

        item_loc = monst_data["loc"]

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


def output_json(data, filename):
    with open(filename, 'w') as fp:
        json.dump(data, fp)


def output_js(old_filename, new_filename, var_name):
    new_file_data = "var {variable} = {data}"
    data = None
    with open(old_filename, "r") as file_data:
        data = file_data.read()
    
    with open(new_filename, 'w') as nf:
        nf.write(new_file_data.format(variable=var_name,
                                      data=data))


if __name__ == "__main__":
    print("Parsing monster data...")
    monster_data, mn_data_dict = parse_monsters()

    print("Parsing item data...")
    item_data = parse_items(mn_data_dict)

    print("Outputting files...")
    output_json(monster_data, "monsters.json")
    output_json(item_data, "items.json")

    print("Putting files as JS files")
    output_js("monsters.json", "MonsterData.js", "monsterData")
    output_js("items.json", "ItemData.js", "itemData")