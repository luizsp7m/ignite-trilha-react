import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sibebar } from "../../components/Sidebar";
import { Input } from '../../components/Form/Input';
import Link from "next/link";

import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password'),
  ], 'As senha precisam ser iguais')
});

export default function CreateUser() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  });

  const { errors } = formState;

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await new Promise(respolve => setTimeout(respolve, 2000));
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1400} mx="auto" px="6">
        <Sibebar />

        <Box as="form" onSubmit={handleSubmit(handleCreateUser)} flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
          <Heading size="lg" fontWeight="nromal">Criar usuário</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Nome completo"
                {...register('name')}
                error={errors.name}
              />

              <Input
                name="email"
                type="email"
                label="E-mail"
                {...register('email')}
                error={errors.email}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                {...register('password')}
                error={errors.password}
              />

              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
                {...register('password_confirmation')}
                error={errors.password_confirmation}
              />
            </SimpleGrid>

            <Flex mt="8" justify="flex-end" width="100%">
              <HStack spacing="4">
                <Link href="/users" passHref>
                  <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                </Link>
                <Button type="submit" isLoading={formState.isSubmitting} colorScheme="pink">Salvar</Button>
              </HStack>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}