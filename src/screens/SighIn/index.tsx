import React, { useContext } from "react";
import { RFValue } from "react-native-responsive-fontsize";

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

    const { user } = useAuth();
//    console.log(user);

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
                    />
                    <SignInSocialButtom
                        title="Entrar com Apple"
                        svg={AppleSvg}
                    />
                </FooterWrapper>
            </Footer>

        </Container>
    );
}