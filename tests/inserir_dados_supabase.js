/**
 * Script para Inserir Dados de Teste no Supabase
 * 
 * Este script lê as entrevistas geradas e insere no banco de dados Supabase
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// ============================================================================
// CONFIGURAÇÃO DO SUPABASE
// ============================================================================

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://czpkifgudgdpvrvvqaoz.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6cGtpZmd1ZGdkcHZydnZxYW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzODI3MzksImV4cCI6MjA4NTk1ODczOX0.ud_MYn1zMibj07HL3WlkgJT8qzH6-goWUkPqSODEpnU';

const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================================================
// FUNÇÕES
// ============================================================================

/**
 * Remove campos com valores null ou undefined do objeto
 */
function limparDados(obj) {
    const limpo = {};
    for (const [chave, valor] of Object.entries(obj)) {
        if (valor !== null && valor !== undefined) {
            limpo[chave] = valor;
        }
    }
    return limpo;
}

/**
 * Insere uma entrevista no Supabase
 */
async function inserirEntrevista(entrevista, id) {
    try {
        // Remove valores null/undefined antes de inserir
        const dadosLimpos = limparDados(entrevista);

        const { data, error } = await supabase
            .from('entrevistas')
            .insert([dadosLimpos])
            .select();

        if (error) {
            console.error(`❌ Erro ao inserir entrevista #${id}:`, error.message);
            return { sucesso: false, erro: error.message };
        }

        console.log(`✅ Entrevista #${id} inserida com sucesso - Nome: ${entrevista.nome_preferido || entrevista.nome_civil_completo || '[Não informado]'}`);
        return { sucesso: true, data };
    } catch (err) {
        console.error(`❌ Erro inesperado ao inserir entrevista #${id}:`, err.message);
        return { sucesso: false, erro: err.message };
    }
}

/**
 * Insere um lote de entrevistas
 */
async function inserirLote(entrevistas) {
    console.log('\n' + '='.repeat(80));
    console.log('INSERINDO ENTREVISTAS NO SUPABASE');
    console.log('='.repeat(80) + '\n');

    const resultados = {
        total: entrevistas.length,
        sucesso: 0,
        falhas: 0,
        erros: []
    };

    for (const item of entrevistas) {
        const resultado = await inserirEntrevista(item.dados, item.id);

        if (resultado.sucesso) {
            resultados.sucesso++;
        } else {
            resultados.falhas++;
            resultados.erros.push({
                id: item.id,
                nome: item.dados.nome_preferido || item.dados.nome_civil_completo,
                erro: resultado.erro
            });
        }

        // Pequeno delay para não sobrecarregar o servidor
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    return resultados;
}

/**
 * Gera relatório final
 */
function gerarRelatorio(resultados) {
    console.log('\n' + '='.repeat(80));
    console.log('RELATÓRIO DE INSERÇÃO');
    console.log('='.repeat(80) + '\n');

    console.log(`📊 Total de entrevistas processadas: ${resultados.total}`);
    console.log(`   ✅ Inseridas com sucesso: ${resultados.sucesso} (${((resultados.sucesso / resultados.total) * 100).toFixed(1)}%)`);
    console.log(`   ❌ Falhas: ${resultados.falhas} (${((resultados.falhas / resultados.total) * 100).toFixed(1)}%)`);

    if (resultados.erros.length > 0) {
        console.log('\n⚠️  ERROS ENCONTRADOS:\n');
        resultados.erros.forEach(erro => {
            console.log(`   Entrevista #${erro.id} (${erro.nome || 'Sem nome'}):`);
            console.log(`   └─ ${erro.erro}\n`);
        });
    }

    console.log('='.repeat(80) + '\n');
}

/**
 * Limpa a tabela de entrevistas (CUIDADO!)
 */
async function limparTabela() {
    console.log('\n⚠️  Limpando tabela de entrevistas...\n');

    const { error } = await supabase
        .from('entrevistas')
        .delete()
        .neq('id', 0); // Deleta todos os registros

    if (error) {
        console.error('❌ Erro ao limpar tabela:', error.message);
        return false;
    }

    console.log('✅ Tabela limpa com sucesso\n');
    return true;
}

// ============================================================================
// EXECUÇÃO
// ============================================================================

async function executar() {
    console.log('\n🚀 Iniciando inserção de dados de teste no Supabase...\n');

    // Verifica se o arquivo de entrevistas existe
    const caminhoArquivo = './tests/entrevistas_geradas.json';

    if (!fs.existsSync(caminhoArquivo)) {
        console.error('❌ Arquivo de entrevistas não encontrado!');
        console.log('💡 Execute primeiro: node tests/gerador_dados_teste.js');
        process.exit(1);
    }

    // Lê as entrevistas
    const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');
    const entrevistas = JSON.parse(conteudo);

    console.log(`📁 Carregadas ${entrevistas.length} entrevistas do arquivo\n`);

    // Pergunta se quer limpar a tabela antes
    const args = process.argv.slice(2);
    const limpar = args.includes('--limpar');

    if (limpar) {
        const sucesso = await limparTabela();
        if (!sucesso) {
            console.log('⚠️  Continuando mesmo com erro na limpeza...\n');
        }
    }

    // Insere as entrevistas
    const resultados = await inserirLote(entrevistas);

    // Gera relatório
    gerarRelatorio(resultados);

    // Verifica a tabela
    console.log('🔍 Verificando dados na tabela...\n');
    const { data: todasEntrevistas, error } = await supabase
        .from('entrevistas')
        .select('id, nome_preferido, nome_civil_completo, email, created_at');

    if (error) {
        console.error('❌ Erro ao buscar entrevistas:', error.message);
    } else {
        console.log(`📊 Total de entrevistas na tabela: ${todasEntrevistas.length}\n`);

        if (todasEntrevistas.length > 0) {
            console.log('Últimas 5 entrevistas inseridas:');
            todasEntrevistas.slice(-5).forEach((e, i) => {
                const nome = e.nome_preferido || e.nome_civil_completo || '[Sem nome]';
                console.log(`   ${i + 1}. ${nome} - ${e.email || '[Sem email]'}`);
            });
        } else {
            console.log('⚠️  A tabela ainda está vazia!');
            console.log('\n💡 Possíveis causas:');
            console.log('   1. Políticas RLS (Row Level Security) do Supabase bloqueando inserções');
            console.log('   2. Estrutura da tabela diferente dos dados enviados');
            console.log('   3. Permissões insuficientes da chave anon');
        }
    }

    console.log('\n✅ Processo concluído!\n');
}

// Executa
executar().catch(err => {
    console.error('\n❌ Erro fatal:', err);
    process.exit(1);
});
