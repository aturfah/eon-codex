python3 parser.py

if test -f "ItemData.js"; then
    echo "Moving Item Data File..."
    mv ItemData.js ../src/ItemData.js;
fi

if test -f "MonsterData.js"; then
    echo "Moving Monster Data File..."
    mv MonsterData.js ../src/MonsterData.js;
fi

