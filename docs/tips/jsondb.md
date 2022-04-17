# JSON as a Database

## TL;DR

JSON is **not** suitable as a database. Do not use it to store persistent data, instead take a read of [this tip part](/tips/storage).

1. JSON, quite simply, is not a database. It's not designed to be a data storage format, rather a way of transmitting data over a network. It's also often used as a way of doing configuration files for programs.

2. There is no redundancy built in to JSON. JSON is just a format, and Python has libraries for it like json and ujson that let you load and dump it, sometimes to files, but that's all it does, write data to a file. There is no sort of DBMS (Database Management System), which means no sort of sophistication in how the data is stored, or built in ways to keep it safe and backed up, there's no built in encryption either - bear in mind in larger applications encryption may be necessary for GDPR/relevant data protection regulations compliance.

3. JSON, unlike relational databases, has no way to store relational data, which is a very commonly needed way of storing data. Relational data, as the name may suggest, is data that relates to other data. For example if you have a table of users and a table of servers, the server table will probably have an owner field, where you'd reference a user from the users table.

    !!! Note

        This point is only relevant for relational data, but since a lot of data stored by bots is relational in nature this is worth including.

4. JSON is primarily a KV (key-value) format, for example `{"a":"b"}` where `a` is the key and `b` is the value, but what if you want to search not by that key but by a sub-key? Well, instead of being able to quickly use `var[key]`, which in a Python dictionary has a constant return time (for more info look up hash tables), you now have to iterate through every object in the dictionary and compare to find what you're looking for. Most relational database systems, like MySQL, MariaDB, and PostgreSQL have ways of indexing secondary fields apart from the primary key so that you can easily search by multiple attributes.

For more info and resources about storing persistent data, please see <https://vcokltfre.dev/tips/storage/>
