-- Up
CREATE INDEX Location_userName ON Location (userName);

-- Down
DROP INDEX Location_userName;