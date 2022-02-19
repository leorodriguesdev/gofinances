import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';


import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SighInTitle,
    Footer
} from './styles';

export function SighIn() {
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

            </Footer>

        </Container>
    );
}