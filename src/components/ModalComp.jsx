import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [name, setName] = useState(dataEdit.name || "");
    const [address, setAddress] = useState(dataEdit.address || "");
  
    const handleSave = () => {
      if (!name || !address) return;
  
      if (addressAlreadyExists()) {
        return alert("Endereço já cadastrado!");
      }
  
      if (Object.keys(dataEdit).length) {
        data[dataEdit.index] = { name, address };
      }
  
      const newDataArray = !Object.keys(dataEdit).length
        ? [...(data ? data : []), { name, address }]
        : [...(data ? data : [])];
  
      localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));
  
      setData(newDataArray);
  
      onClose();
    };
  
    const addressAlreadyExists = () => {
      if (dataEdit.address !== address && data?.length) {
        return data.find((item) => item.address === address);
      }
  
      return false;
    };
  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cadastro de Clientes</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl display="flex" flexDir="column" gap={4}>
                <Box>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Box>
                <Box>
                  <FormLabel>Endereço</FormLabel>
                  <Input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Box>
              </FormControl>
            </ModalBody>
  
            <ModalFooter justifyContent="start">
              <Button colorScheme="green" mr={3} onClick={handleSave}>
                SALVAR
              </Button>
              <Button colorScheme="red" onClick={onClose}>
                CANCELAR
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ModalComp;
  