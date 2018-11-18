
CREATE TABLE manager_address (
	"name" STRING NULL,
	address STRING NULL,
	abi STRING NULL,
	FAMILY "primary" ("name", address, abi, rowid)
);
