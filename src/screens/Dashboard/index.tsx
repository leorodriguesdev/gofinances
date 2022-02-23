import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighlightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton,
    LoadContainer
} from "./styles";


export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface highlightProps {
    amount: string;
    lastTransaction: string;
}
interface highlightData {
    entries: highlightProps;
    expensives: highlightProps;
    total: highlightProps;
}

export function Dashboard() {
    const [isLoading , setIsLoading] = useState(true);
    const [transactions, setTransanctions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<highlightData>({} as highlightData);

    const theme = useTheme();

    const { signOut, user } = useAuth();

    function getLastTransactionsDate(
        collection: DataListProps[],
        type: 'positive' | 'negative'
        ){
        const lastTransaction = new Date(
        Math.max.apply(Math, collection
        .filter(transactions => transactions.type === type)
        .map(transaction => new Date(transaction.date).getTime())))

       return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
    }

    async function loadTransaction() {
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let endriesTotal = 0;
        let expensivesTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions
            .map((item: DataListProps) => {

                if (item.type === 'positive') {
                    endriesTotal += Number(item.amount);
                } else {
                    expensivesTotal += Number(item.amount);
                }

                const amount = Number(item.amount)
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });

                const date = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                }).format(new Date(item.date));

                return {
                    id: item.id,
                    name: item.name,
                    amount,
                    type: item.type,
                    category: item.category,
                    date    
                }
            });

            setTransanctions(transactionsFormatted);

            const lastTransactionsEntries = getLastTransactionsDate(transactions, 'positive');
            const lastTransactionsExpensives = getLastTransactionsDate(transactions, 'negative');
            const totalInterval = `${lastTransactionsExpensives}`;

            setHighlightData({
                entries: {
                    amount: endriesTotal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                    lastTransaction: `Última entrada dia ${lastTransactionsEntries}`
                },
                expensives: {
                    amount: expensivesTotal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                    lastTransaction: `Última saída dia ${lastTransactionsExpensives}`
                },
                total: {
                    amount: (endriesTotal - expensivesTotal).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }),
                    lastTransaction: totalInterval
                }
            });
            setIsLoading(false);
        }

        useEffect(() => {
            loadTransaction();
        }, [])

        useFocusEffect(useCallback(() => {
            loadTransaction();
            },[]));

        return (
            <Container>
                { 
                isLoading ? 
                <LoadContainer>
                    <ActivityIndicator 
                     color={theme.colors.primary}
                     size='large'
                     />
                </LoadContainer> : 
                <>
                <Header>
                    <UserWrapper>
                        <UserInfo>
                            <Photo source={{ uri: user.photo }} />
                            <User>
                                <UserGreeting>Olá,</UserGreeting>
                                <UserName>{user.name}</UserName>
                            </User>
                        </UserInfo>

                        <LogoutButton onPress={signOut}>
                            <Icon name="power" />
                        </LogoutButton>

                    </UserWrapper>
                </Header>

                <HighlightCards>
                    <HighlightCard
                        type='up'
                        title='Entradas'
                        amount={highlightData.entries.amount}
                        lastTransaction={highlightData.entries.lastTransaction} />
                    <HighlightCard
                        type='down'
                        title='Saídas'
                        amount={highlightData.expensives.amount}
                        lastTransaction={highlightData.expensives.lastTransaction} />
                    <HighlightCard
                        type='total'
                        title='Total'
                        amount={highlightData.total.amount}
                        lastTransaction={highlightData.total.lastTransaction} />
                </HighlightCards>

                <Transactions>
                    <Title>Listagem</Title>

                    <TransactionList
                        data={transactions}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <TransactionCard data={item} />}
                    />
                </Transactions>
                </>
                }
                </Container>

        )
    }


