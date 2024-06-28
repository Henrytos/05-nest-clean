# NEST JS COMMAND PROVIDERS  


## generator  secret and public key rsa 256 int terminal ubunto 22.06 

### WEIGHT = .per

#### private_key:
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048

#### public_key:
openssl rsa -pubout -in private_key.pem -out public_key.pem

### LEGIBLE = .text 

#### private_key:
cat private_key.pem | base64 | tr -d '\n' > private_key_base64.txt

#### public_key:
cat public_key.pem | base64 | tr -d '\n' > public_key_base64.txt
