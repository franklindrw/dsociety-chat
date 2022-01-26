import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { useRouter } from "next/router";

function Titulo(props) {
    const Tag = props.tag || "h1";
    return (
        <div>
            <Tag>{props.children}</Tag>
            <style jsx>
                {`
                    ${Tag} {
                        color: #fff;
                        font-size: 1.5rem;
                        font-weight: 600;
                        margin: 15px;
                    }
                `}
            </style>
        </div>
    );
}

// componente React
// function HomePage() {
//     //JSX
//     return (
//         <div>
//             <GlobalStyle />
//             <Titulo tag="h1">Dark Society</Titulo>
//             <h2>chat - Dark Society</h2>
//         </div>
//     );
// }
// export default HomePage;

export default function PaginaInicial() {
    // const username = "franklindrw";
    const [username, setUsername] = React.useState("franklindrw");
    const roteamento = useRouter();

    return (
        <>
            <Box
                styleSheet={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: appConfig.theme.colors.neutrals[505],
                    backgroundImage:
                        "url('https://www.wallpaperup.com/uploads/wallpapers/2014/03/11/295839/105e7243080e78fd2589d0615346e763.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundBlendMode: "multiply",
                }}
            >
                <Box
                    styleSheet={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        width: "100%",
                        maxWidth: "600px",
                        borderRadius: "25px",
                        padding: "32px",
                        margin: "16px",
                        boxShadow: "0 2px 10px 0 rgb(0 0 0 / 80%)",
                        backgroundColor: appConfig.theme.colors.neutrals[999],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (infosDoEvento) {
                            infosDoEvento.preventDefault();
                            roteamento.push("/chat");
                        }}
                        styleSheet={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            width: { xs: "100%", sm: "50%" },
                            textAlign: "center",
                            marginBottom: "32px",
                        }}
                    >
                        <Titulo tag="h2">Dark Society</Titulo>
                        <Text
                            variant="body3"
                            styleSheet={{
                                marginBottom: "32px",
                                color: appConfig.theme.colors.neutrals[100],
                            }}
                        >
                            {appConfig.name}
                        </Text>

                        <TextField
                            value={username}
                            onChange={function (event) {
                                const valor = event.target.value;
                                setUsername(valor);
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor:
                                        appConfig.theme.colors.neutrals[100],
                                    mainColor:
                                        appConfig.theme.colors.neutrals[500],
                                    mainColorHighlight:
                                        appConfig.theme.colors.primary[505],
                                    backgroundColor:
                                        appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            label="Entrar"
                            fullWidth
                            buttonColors={{
                                contrastColor:
                                    appConfig.theme.colors.neutrals[100],
                                mainColor: appConfig.theme.colors.neutrals[506],
                                mainColorLight:
                                    appConfig.theme.colors.primary[505],
                                mainColorStrong:
                                    appConfig.theme.colors.primary[505],
                            }}
                        />
                    </Box>
                    {/* Formulário */}

                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            maxWidth: "200px",
                            padding: "16px",
                            backgroundColor:
                                appConfig.theme.colors.neutrals[800],
                            border: "1px solid",
                            borderColor: appConfig.theme.colors.neutrals[506],
                            borderRadius: "10px",
                            flex: 1,
                            minHeight: "240px",
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: "50%",
                                marginBottom: "16px",
                            }}
                            src={`https://github.com/${username}.png`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor:
                                    appConfig.theme.colors.neutrals[900],
                                padding: "3px 10px",
                                borderRadius: "1000px",
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}
