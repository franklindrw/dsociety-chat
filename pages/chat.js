import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import { SendStikers } from "../src/components/SendStikers.js";

const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwNTM5OCwiZXhwIjoxOTU4ODgxMzk4fQ.3RVP6O0pRKr6LxxxvP3wupnWbOC5Rqz1DoIthvySxc8";

const SUPABASE_URL = "https://lpggjsevxbuepxyagoza.supabase.co";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function atualizaMensagem(adicionaMensagem) {
    return supabase
        .from("mensagens")
        .on("INSERT", (respostaLive) => {
            adicionaMensagem(respostaLive.new);
        })
        .subscribe();
}

export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;

    const [mensagem, setMensagem] = React.useState("");
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    React.useEffect(() => {
        supabase
            .from("mensagens")
            .select("*")
            .order("id", { ascending: false })
            .then(({ data }) => {
                console.log(`Dados da consulta:`, data);
                setListaDeMensagens(data);
            });
        atualizaMensagem((novaMensagem) => {
            console.log("Nova mensagem: ", novaMensagem);
            setListaDeMensagens((valorAtualDaLista) => {
                return [novaMensagem, ...valorAtualDaLista];
            });
        });
    }, []);

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            usuario: usuarioLogado,
            texto: novaMensagem,
        };

        supabase
            .from("mensagens")
            .insert([mensagem])
            .then(({ data }) => {
                console.log("criando mensagem", data);
            });
        setMensagem("");
    }

    return (
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
                color: appConfig.theme.colors.neutrals["000"],
            }}
        >
            <Box
                styleSheet={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
                    borderRadius: "5px",
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: "100%",
                    maxWidth: "95%",
                    maxHeight: "95vh",
                    padding: "32px",
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: "relative",
                        display: "flex",
                        flex: 1,
                        height: "80%",
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: "column",
                        borderRadius: "5px",
                        padding: "16px",
                    }}
                >
                    <MessageList mensagens={listaDeMensagens} />
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}
                    <Box
                        as="form"
                        styleSheet={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === "Enter") {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: "100%",
                                border: "0",
                                resize: "none",
                                borderRadius: "5px",
                                padding: "6px 8px",
                                backgroundColor:
                                    appConfig.theme.colors.neutrals[800],
                                marginRight: "12px",
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <SendStikers
                            onStickerClick={(sticker) => {
                                console.log(
                                    "salva esse sticker no banco",
                                    sticker
                                );
                                handleNovaMensagem(`:sticker:${sticker}`);
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

function Header() {
    return (
        <>
            <Box
                styleSheet={{
                    width: "100%",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Text variant="heading5">Chat</Text>
                <Button
                    variant="tertiary"
                    colorVariant="neutral"
                    label="Logout"
                    href="/"
                />
            </Box>
        </>
    );
}

function MessageList(props) {
    console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: "scroll",
                display: "flex",
                flexDirection: "column-reverse",
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: "16px",
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: "5px",
                            padding: "6px",
                            marginBottom: "12px",
                            hover: {
                                backgroundColor:
                                    appConfig.theme.colors.neutrals[700],
                            },
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: "8px",
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    marginRight: "8px",
                                }}
                                src={`https://github.com/${mensagem.usuario}.png`}
                            />
                            <Text tag="strong">{mensagem.usuario}</Text>
                            <Text
                                styleSheet={{
                                    fontSize: "10px",
                                    marginLeft: "8px",
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {new Date().toLocaleDateString()}
                            </Text>
                        </Box>
                        {mensagem.texto.startsWith(":sticker:") ? (
                            <Image
                                src={mensagem.texto.replace(":sticker:", "")}
                            />
                        ) : (
                            mensagem.texto
                        )}
                    </Text>
                );
            })}
        </Box>
    );
}
