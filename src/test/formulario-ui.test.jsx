
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// Dados de teste centralizados
const MOCK_FORM_DATA = {
    identificacao: {
        entrevistador: 'Ana Lucia Fernandes',
        data: '2026-02-07'
    },
    dadosPessoais: {
        nomePreferido: 'Maria Teste',
        nomeCivil: 'Maria da Silva',
        telefone: '(11) 99999-9999',
        email: 'maria.teste@example.com',
        nascimento: '2000-01-01',
        rg: '12.345.678-9',
        cpf: '123.456.789-00',
        cidade: 'Santos',
        naturalidade: 'Santos - SP',
        endereco: 'Rua de Teste, 123',
        bairro: 'Centro',
        estadoCivil: 'Solteiro(a)'
    },
    raca: 'Preto/a/e',
    genero: {
        identidade: 'Feminina',
        trans: 'Não',
        orientacao: 'Heterossexual'
    },
    escolaridade: {
        nivel: 'Ensino Médio Completo',
        tipo: 'Sempre Pública'
    },
    filiacao: {
        mae: 'Mãe Teste',
        profMae: 'Aposentada',
        escMae: 'Ensino Fundamental completo'
    },
    moradia: {
        condicao: 'Própria',
        tipo: 'Alvenaria'
    },
    internet: {
        tem: 'Sim',
        tipo: 'Wi-Fi (Banda Larga)',
        sinal: 'Sim'
    },
    trabalho: {
        trabalhou: 'Não',
        ajudou: 'Não'
    },
    renda: {
        faixa: 'Até 300,00',
        beneficios: 'Não',
        cesta: 'Não'
    },
    famTransporteSaude: {
        filhos: 'Não',
        veiculo: 'Não',
        transporte: 'Ônibus',
        auxilio: 'Não',
        plano: 'Apenas SUS',
        tipoSanguineo: 'O+',
        psicoterapia: 'Não',
        deficiencia: 'Não',
        problemas: 'Não',
        alergias: 'Não',
        medicamentos: 'Não',
        substancias: 'Não'
    },
    cotidiano: {
        moraCom: 'Pais',
        relacao: 'Boa relação familiar tranquila',
        historico: 'História de teste para validação do formulário.',
        curso: 'Administração',
        expectativa: 'Crescer profissionalmente',
        motivacao: 'Busca por melhores oportunidades de emprego.',
        frequencia: 'Dias de semana'
    }
};

// Mock do Supabase
vi.mock('../lib/supabase', () => {
    const mockUpsert = vi.fn().mockResolvedValue({
        data: { id: '123' },
        error: null
    });

    const mockSelect = vi.fn().mockResolvedValue({
        data: [],
        error: null
    });

    const mockFrom = vi.fn().mockReturnValue({
        upsert: mockUpsert,
        select: mockSelect
    });

    return {
        supabase: {
            from: mockFrom
        }
    };
});

class FormularioHelper {
    constructor(user) {
        this.user = user;
    }

    async safeClick(element) {
        if (!element) return;
        try {
            await this.user.click(element);
        } catch (e) {
            console.warn('  >> user.click failed, trying fireEvent.click', e.message);
            fireEvent.click(element);
        }
    }

    async preencherIdentificacao() {
        console.log('  > Preenchendo Identificação...');
        await this.safeClick(await screen.findByLabelText(new RegExp(MOCK_FORM_DATA.identificacao.entrevistador, 'i')));

        const inputData = screen.getByLabelText(/Data da Entrevista/i);
        await this.user.clear(inputData);
        await this.user.type(inputData, MOCK_FORM_DATA.identificacao.data);
    }

    async preencherDadosPessoais() {
        console.log('  > Preenchendo Dados Pessoais...');
        const { dadosPessoais } = MOCK_FORM_DATA;

        console.log('    >> Digitando Nome Completo...');
        await this.user.type(screen.getByPlaceholderText(/Seu nome completo/i), dadosPessoais.nomePreferido);

        const radioNaoCivil = document.querySelector('input[name="nome_mesmo_documento"][value="Não"]');
        if (radioNaoCivil) {
            console.log('    >> Clicando em Nome Civil diferente...');
            await this.safeClick(radioNaoCivil);
            // Agora o campo aparece
            console.log('    >> Aguardando campo Nome Civil...');
            const inputCivil = await screen.findByLabelText(/Qual o nome que consta/i);
            await this.user.type(inputCivil, dadosPessoais.nomeCivil);
        } else {
            console.log('    >> WARN: Radio Nome Civil não encontrado!');
        }

        console.log('    >> Digitando Email...');
        await this.user.type(screen.getByLabelText(/E-mail/i), dadosPessoais.email);

        console.log('    >> Digitando Telefone...');
        await this.user.type(screen.getByLabelText(/Telefone/i), dadosPessoais.telefone);

        console.log('    >> Digitando Nascimento...');
        await this.user.type(screen.getByLabelText(/Data de Nascimento/i), dadosPessoais.nascimento);

        console.log('    >> Digitando CPF...');
        await this.user.type(screen.getByLabelText(/CPF/i), dadosPessoais.cpf);

        console.log('    >> Digitando RG...');
        await this.user.type(screen.getByLabelText(/RG/i), dadosPessoais.rg);

        console.log('    >> Selecionando Estado Civil...');
        const radioEstado = document.querySelector(`input[name="estado_civil"][value="${dadosPessoais.estadoCivil}"]`);
        if (radioEstado) await this.safeClick(radioEstado);

        console.log('    >> Selecionando Cidade...');
        const radioCidade = document.querySelector(`input[name="cidade"][value="${dadosPessoais.cidade}"]`);
        if (radioCidade) await this.safeClick(radioCidade);

        console.log('    >> Digitando Endereço...');
        await this.user.type(screen.getByLabelText(/Naturalidade/i), dadosPessoais.naturalidade);
        await this.user.type(screen.getByLabelText(/Bairro/i), dadosPessoais.bairro);
        await this.user.type(screen.getByLabelText(/Logradouro/i), dadosPessoais.endereco);
    }

    async preencherRaca() {
        console.log('  > Preenchendo Raça...');
        await this.safeClick(screen.getByLabelText(new RegExp(MOCK_FORM_DATA.raca, 'i')));
    }

    async preencherGenero() {
        console.log('  > Preenchendo Gênero...');
        await this.safeClick(screen.getByLabelText(MOCK_FORM_DATA.genero.identidade));

        const radioTransNao = document.querySelector('input[name="trans_travesti"][value="Não"]');
        if (radioTransNao) await this.safeClick(radioTransNao);

        await this.safeClick(screen.getByLabelText(MOCK_FORM_DATA.genero.orientacao));
    }

    async preencherEscolaridade() {
        console.log('  > Preenchendo Escolaridade...');
        await this.safeClick(screen.getByLabelText(MOCK_FORM_DATA.escolaridade.nivel));
        await this.safeClick(screen.getByLabelText(new RegExp(MOCK_FORM_DATA.escolaridade.tipo, 'i')));
    }

    async preencherFiliacao() {
        console.log('  > Preenchendo Filiação...');
        await this.user.type(screen.getByLabelText(/Nome da Mãe/i), MOCK_FORM_DATA.filiacao.mae);
        await this.user.type(screen.getByLabelText(/Profissão da Mãe/i), MOCK_FORM_DATA.filiacao.profMae);

        const radioEscMae = document.querySelector(`input[name="escolaridade_mae"][value="${MOCK_FORM_DATA.filiacao.escMae}"]`);
        if (radioEscMae) await this.safeClick(radioEscMae);
        else {
            const labels = screen.getAllByLabelText(new RegExp(MOCK_FORM_DATA.filiacao.escMae, 'i'));
            if (labels.length > 0) await this.safeClick(labels[0]);
        }
    }

    async preencherVinculo() {
        console.log('  > Preenchendo Vínculo...');
        const radio = document.querySelector('input[name="familiar_nucleo"][value="Não"]');
        if (radio) await this.safeClick(radio);
    }

    async preencherMoradiaInternet() {
        console.log('  > Preenchendo Moradia/Internet...');
        await this.safeClick(screen.getByLabelText(new RegExp(MOCK_FORM_DATA.moradia.condicao, 'i')));
        await this.safeClick(screen.getByLabelText(new RegExp(MOCK_FORM_DATA.moradia.tipo, 'i')));

        const radioInternet = document.querySelector('input[name="internet_tem"][value="Sim"]');
        if (radioInternet) await this.safeClick(radioInternet);

        await waitFor(() => screen.getByLabelText(/Qual o tipo de conexão?/i));

        await this.safeClick(screen.getByLabelText(new RegExp(MOCK_FORM_DATA.internet.tipo.replace(')', '\\)'), 'i')));

        const radioSinal = document.querySelector('input[name="internet_sinal"][value="Sim"]');
        if (radioSinal) await this.safeClick(radioSinal);
    }

    async preencherTrabalho() {
        console.log('  > Preenchendo Trabalho...');
        const radioTrabalho = document.querySelector('input[name="trabalho_renda_semana"][value="Não"]');
        if (radioTrabalho) await this.safeClick(radioTrabalho);

        const radioAjuda = document.querySelector('input[name="trabalho_ajuda_familiar"][value="Não"]');
        if (radioAjuda) await this.safeClick(radioAjuda);
    }

    async preencherRenda() {
        console.log('  > Preenchendo Renda...');
        await this.safeClick(screen.getByLabelText(new RegExp(MOCK_FORM_DATA.renda.faixa.replace('.', '\\.'), 'i')));

        const radioBeneficios = document.querySelector('input[name="beneficios_recebe"][value="Não"]');
        if (radioBeneficios) await this.safeClick(radioBeneficios);

        const radioCesta = document.querySelector('input[name="cesta_basica"][value="Não"]');
        if (radioCesta) await this.safeClick(radioCesta);
    }

    async preencherFamiliaTransporteSaude() {
        console.log('  > Preenchendo Família/Transporte/Saúde...');
        const { famTransporteSaude } = MOCK_FORM_DATA;

        const radioFilhos = document.querySelector('input[name="filhos_tem"][value="Não"]');
        if (radioFilhos) await this.safeClick(radioFilhos);

        const radioVeiculo = document.querySelector('input[name="transporte_veiculo"][value="Não"]');
        if (radioVeiculo) await this.safeClick(radioVeiculo);

        await this.safeClick(screen.getByLabelText(famTransporteSaude.transporte));

        const radioAuxilio = document.querySelector('input[name="transporte_auxilio"][value="Não"]');
        if (radioAuxilio) await this.safeClick(radioAuxilio);

        await this.safeClick(screen.getByLabelText(famTransporteSaude.plano));
        await this.safeClick(screen.getByLabelText(famTransporteSaude.tipoSanguineo));

        const checkboxes = [
            'saude_psicoterapia', 'saude_deficiencia', 'saude_problemas',
            'saude_alergias', 'saude_medicamentos', 'saude_substancias'
        ];

        for (const name of checkboxes) {
            const radioNao = document.querySelector(`input[name="${name}"][value="Não"]`);
            if (radioNao) await this.safeClick(radioNao);
        }
    }

    async preencherCotidianoObjetivo() {
        console.log('  > Preenchendo Cotidiano/Objetivo...');
        const { cotidiano } = MOCK_FORM_DATA;

        const radioMoraSozinhoNao = document.querySelector('input[name="cotidiano_mora_com"][value="Não"]');
        if (radioMoraSozinhoNao) await this.safeClick(radioMoraSozinhoNao);

        await this.user.type(screen.getByLabelText(/Com quem mora/i), cotidiano.moraCom);
        await this.user.type(screen.getByLabelText(/Como é a relação/i), cotidiano.relacao);
        await this.user.type(screen.getByLabelText(/Histórico Pessoal/i), cotidiano.historico);

        await this.user.type(screen.getByLabelText(/Já sabe que curso/i), cotidiano.curso);

        await this.user.type(screen.getByLabelText(/Como sua mãe se sentiria/i), cotidiano.expectativa);

        await this.safeClick(screen.getByLabelText(new RegExp('Preparatório para o ENEM', 'i')));

        await this.user.type(screen.getByLabelText(/Que temas você gostaria/i), cotidiano.motivacao);

        await this.safeClick(screen.getByLabelText(new RegExp(cotidiano.frequencia, 'i')));

        const checkboxLGPD = screen.getByRole('checkbox', { name: /Li e aceito/i });
        await this.safeClick(checkboxLGPD);
    }

    async enviar() {
        console.log('  > Enviando formulário...');
        const submitButton = screen.getByRole('button', {
            name: /Enviar Formulário/i
        });
        await this.safeClick(submitButton);
    }
}

describe('Formulário de Entrevista - Fluxo Completo', () => {
    let user;
    let helper;

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        window.alert = vi.fn();
        window.confirm = vi.fn(() => true);

        user = userEvent.setup();
        helper = new FormularioHelper(user);
    });

    it('deve preencher e enviar o formulário completo com sucesso', async () => {
        console.log('🔷 Iniciando Teste UI...');
        render(<App />);

        await helper.preencherIdentificacao();
        await helper.preencherDadosPessoais();
        await helper.preencherRaca();
        await helper.preencherGenero();
        await helper.preencherEscolaridade();
        await helper.preencherFiliacao();
        await helper.preencherVinculo();
        await helper.preencherMoradiaInternet();
        await helper.preencherTrabalho();
        await helper.preencherRenda();
        await helper.preencherFamiliaTransporteSaude();
        await helper.preencherCotidianoObjetivo();

        await helper.enviar();

        console.log('🔷 Verificando Supabase...');
        await waitFor(() => {
            const { supabase } = require('../lib/supabase');
            expect(supabase.from).toHaveBeenCalledWith('entrevistas');

            const payload = supabase.from().upsert.mock.calls[0][0];
            console.log('✅ Payload capturado:', payload);

            expect(payload).toMatchObject({
                status_formulario: 'completo',
                nome_completo: MOCK_FORM_DATA.dadosPessoais.nomePreferido,
                email: MOCK_FORM_DATA.dadosPessoais.email,
                objetivo_curso: MOCK_FORM_DATA.cotidiano.curso
            });
        }, { timeout: 10000 });

        expect(window.alert).toHaveBeenCalledWith(
            expect.stringContaining('sucesso')
        );
        console.log('✅ TESTE FINALIZADO COM SUCESSO!');
    }, 60000); // 60s timeout
});
