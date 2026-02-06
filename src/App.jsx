import React from 'react';
import { FormProvider, useFormContext } from '@/context/FormContext';
import { useFormContext as useRHF } from 'react-hook-form';
import { supabase } from '@/lib/supabase';
import { StepIndicator } from '@/components/form/StepIndicator';
import { Identificacao } from '@/components/sections/Identificacao';
import { DadosPessoais } from '@/components/sections/DadosPessoais';
import { RacaPronomes } from '@/components/sections/RacaPronomes';
import { GeneroOrientacao } from '@/components/sections/GeneroOrientacao';
import { EscolaridadeFamilia } from '@/components/sections/EscolaridadeFamilia';
import { VinculoFamiliar } from '@/components/sections/VinculoFamiliar';
import { MoradiaInternet } from '@/components/sections/MoradiaInternet';
import { TrabalhoRenda } from '@/components/sections/TrabalhoRenda';
import { RendaBeneficios } from '@/components/sections/RendaBeneficios';
import { FamiliaTransporteSaude } from '@/components/sections/FamiliaTransporteSaude';
import { CotidianoObjetivo } from '@/components/sections/CotidianoObjetivo';
import { CheckCircle2 } from 'lucide-react';

function FormContent() {
    const { handleSubmit, getValues, trigger, formState: { isValid } } = useRHF();

    const sendToSupabase = async (data) => {
        try {
            console.log('Submitting:', data);

            // Filter out fields that don't exist in Supabase or are UI-only
            const { idade, ...insertData } = data;

            const { error } = await supabase.from('entrevistas').insert([insertData]);

            if (error) {
                console.error(error);
                alert(`Erro ao salvar: ${error.message}`);
                return;
            }

            alert('Entrevista salva com sucesso!');
            window.location.reload();
        } catch (e) {
            alert(`Erro inesperado: ${e.message}`);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Trigger validation to show formatting errors (CPF, Email, etc)
        await trigger();
        const data = getValues();
        const { formState: { errors } } = useRHF();

        // Find empty fields that are NOT in the error list (since everything is optional in Zod)
        const emptyFields = Object.keys(data).filter(key => {
            const val = data[key];
            return val === undefined || val === null || val === '' || (Array.isArray(val) && val.length === 0);
        });

        const errorFields = Object.keys(errors);
        const allPendingFields = [...new Set([...errorFields, ...emptyFields])];

        if (allPendingFields.length > 0) {
            // Get Readable Names
            const fieldNames = allPendingFields.map(key => {
                const label = document.querySelector(`label[for="${key}"]`) ||
                    document.querySelector(`[name="${key}"]`)?.closest('.space-y-2')?.querySelector('label');
                return label ? label.textContent.replace('*', '').trim() : key;
            }).slice(0, 10);

            const remaining = allPendingFields.length - fieldNames.length;
            const fieldList = fieldNames.map(name => `• ${name}`).join('\n');
            const message = `Os seguintes campos não foram preenchidos ou possuem erros:\n\n${fieldList}${remaining > 0 ? `\n...e outros ${remaining} itens.` : ''}\n\nDeseja enviar o formulário incompleto mesmo assim?`;

            if (!window.confirm(message)) {
                return;
            }
        }

        await sendToSupabase(data);
    };

    return (
        <div className="min-h-screen md:h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-900 md:overflow-hidden">

            {/* Sidebar (Desktop Only) */}
            <aside className="hidden md:flex flex-col w-80 h-full bg-white border-r border-gray-200 overflow-y-auto">
                <div className="p-6 border-b border-gray-100 flex flex-col items-center text-center">
                    <img src="/logo_educafro.png" alt="Educafro" className="h-20 w-auto object-contain mb-4" />
                    <h1 className="text-lg font-bold text-gray-900 leading-tight">Formulário Social</h1>
                    <p className="text-sm text-primary-600 font-medium">NAE 2026</p>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                    <StepIndicator />
                </div>


            </aside>

            {/* Header (Mobile Only) */}
            <header className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/logo_educafro.png" alt="Educafro" className="h-10 w-auto object-contain" />
                        <div>
                            <h1 className="text-sm font-bold text-gray-900 leading-tight">Formulário Social</h1>
                            <p className="text-xs text-primary-600 font-medium">NAE 2026</p>
                        </div>
                    </div>
                </div>
                {/* Mobile Step Indicator included inside header for stickiness */}
                <StepIndicator />
            </header>

            {/* Main Content Area - TODAS AS SEÇÕES */}
            <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 md:p-12 overflow-y-auto custom-scrollbar">
                <form onSubmit={handleFormSubmit} className="space-y-8 pb-20 md:pb-0">

                    {/* Todas as seções renderizadas de uma vez */}
                    <div id="identificacao">
                        <Identificacao />
                    </div>

                    <div id="dados-pessoais">
                        <DadosPessoais />
                    </div>

                    <div id="raca-pronomes">
                        <RacaPronomes />
                    </div>

                    <div id="genero-orientacao">
                        <GeneroOrientacao />
                    </div>

                    <div id="escolaridade-familia">
                        <EscolaridadeFamilia />
                    </div>

                    <div id="vinculo-familiar">
                        <VinculoFamiliar />
                    </div>

                    <div id="moradia-internet">
                        <MoradiaInternet />
                    </div>

                    <div id="trabalho-renda">
                        <TrabalhoRenda />
                    </div>

                    <div id="renda-beneficios">
                        <RendaBeneficios />
                    </div>

                    <div id="familia-transporte-saude">
                        <FamiliaTransporteSaude />
                    </div>

                    <div id="cotidiano-objetivo">
                        <CotidianoObjetivo />
                    </div>

                    {/* Botão de Envio - Fixo no canto inferior direito no desktop, Sticky no mobile */}
                    <div className="md:fixed md:bottom-10 md:right-12 sticky bottom-0 bg-white md:bg-transparent border-t border-gray-200 md:border-none p-6 md:p-0 shadow-lg md:shadow-none rounded-t-xl md:rounded-none flex justify-end z-50">
                        <button
                            type="submit"
                            className="w-full md:w-auto md:min-w-[260px] bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl active:scale-95 ring-4 ring-white md:ring-0"
                        >
                            <CheckCircle2 className="w-6 h-6" />
                            <span className="text-lg">Enviar Formulário</span>
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

function App() {
    return (
        <FormProvider>
            <FormContent />
        </FormProvider>
    );
}

export default App;
