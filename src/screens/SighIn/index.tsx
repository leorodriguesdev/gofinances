import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { useAuth } from "../../hooks/auth";

import { SignInSocialButtom } from "../../components/SignInSocialButtom";

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SighInTitle,
    Footer,
    FooterWrapper
} from './styles';

export function SighIn() {

    const [ isLoading,SetisLoading ] = useState(false);
    const { signInWithGoogle, signInWithApple } = useAuth();

    const theme = useTheme();

    async function handleSignInWithGoogle() {
        try {
            SetisLoading(true);
            return await signInWithGoogle();
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Erro ao realizar o login com a conta Google');
            SetisLoading(false);
        } 
    }

    async function handleSignInWithApple() {
        try {
            SetisLoading(true);
            return await signInWithApple();
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Erro ao realizar o login com a conta Apple');
            SetisLoading(false);
        } 

    }



    return(
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />

                    <Title>
                        Controle suas{"\n"}
                        finanças de forma{"\n"}
                        muito simples
                    </Title>
                </TitleWrapper>

                <SighInTitle>
                    Faça seu login com{"\n"}
                    uma das contas abaixo
                </SighInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButtom
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSignInWithGoogle}
                    />
                    {
                        Platform.OS === 'ios' &&
                        <SignInSocialButtom
                        title="Entrar com Apple"
                        svg={AppleSvg}
                        onPress={handleSignInWithApple}
                    />
                    }
                </FooterWrapper>

                { isLoading && 
                    <ActivityIndicator 
                        color={theme.colors.shape} 
                        style={{ marginTop: 18 }}
                    /> 
                
                }
            </Footer>

        </Container>
    );
}