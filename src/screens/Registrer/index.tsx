import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputForm } from "../../components/Form/InputForm";
import { Modal } from "react-native";
import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButtom } from "../../components/Form/CategorySelectButtom";
import { CategorySelect } from "../CategorySelect";


import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes
} from "./styles";

interface FormData {
  amount: string;
  name: string;
}
export function Registrer() {

  const [transactionType, setTransactiontype] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);



  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const { 
    control, 
    handleSubmit 
  } = useForm();

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactiontype(type);
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }

  function handleRegister(form: FormData) {
    const data = { 
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }
    console.log(data);
  }


  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm
            placeholder="Nome"
            name="name"
            control={control}
          />
          <InputForm
            name="amount"
            control={control}
            placeholder="Preço"
          />
          <TransactionTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionTypes>
          <CategorySelectButtom
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>
        <Button
          title="Enviar"
          onPress={handleSubmit(handleRegister)}
        />
      </Form>
      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
}