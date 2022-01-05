import { Flex, Input } from "@chakra-ui/react";
import { useRef } from "react";

export function Search() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input
        color="gray.50"
        variant="unstyled"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: 'gray.400' }}
        paddingX="4"
        mr="4"
        ref={searchInputRef}
      />
    </Flex>
  );
}