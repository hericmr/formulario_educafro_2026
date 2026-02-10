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
import { AutosaveIndicator } from '@/components/form/AutosaveIndicator';
import { ReviewModal } from '@/components/form/ReviewModal';
import { SkipLink } from '@/components/ui/SkipLink';
import { useAnnouncement } from '@/hooks/useAnnouncement';
import { CheckCircle2 } from 'lucide-react';

function FormContent() {
    const methods = useRHF();
    const { getValues, watch, trigger, formState: { errors } } = methods;
    const [isSaving, setIsSaving] = React.useState(false);
    const [lastSaved, setLastSaved] = React.useState(null);
    const { announce, AnnouncementRegion } = useAnnouncement();

    // Get or Create UUID for this session
    const [formUuid] = React.useState(() => {
        const saved = localStorage.getItem('educafro_form_uuid');
        if (saved) return saved;
        const newUuid = crypto.randomUUID();
        localStorage.setItem('educafro_form_uuid', newUuid);
        return newUuid;
    });

    const sendToSupabase = async (data, isFinal = false) => {
        try {
            setIsSaving(true);

            // Clean data: replace empty strings with null for Supabase/Postgres compatibility
            const cleanedData = Object.keys(data).reduce((acc, key) => {
                let value = data[key];

                // Special handling for array fields that need to be stored as strings
                if ((key === 'entrevistador' || key === 'objetivo_educafro') && Array.isArray(value)) {
                    value = value.join(', ');
                }

                acc[key] = (value === "" || value === undefined) ? null : value;
                return acc;
            }, {});

            const payload = {
                ...cleanedData,
                form_uuid: formUuid,
                status_formulario: isFinal ? 'completo' : 'rascunho'
            };

            const { error } = await supabase
                .from('entrevistas')
                .upsert([payload], { onConflict: 'form_uuid' });

            if (error) {
                console.error('Save Error:', error);
                if (isFinal) alert(`Erro ao salvar: ${error.message}`);
                return;
            }

            setLastSaved(new Date());

            // Announce save to screen readers
            if (!isFinal) {
                const now = new Date();
                announce(`Formulário salvo automaticamente às ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`);
            }

            if (isFinal) {
                alert('Entrevista salva com sucesso!');
                localStorage.removeItem('educafro_form_uuid'); // Clear for next one
                window.location.reload();
            }
        } catch (e) {
            console.error('Unexpected error:', e);
        } finally {
            setIsSaving(false);
        }
    };

    // Auto-save logic
    React.useEffect(() => {
        const subscription = watch((value) => {
            const timer = setTimeout(() => {
                sendToSupabase(value, false);
            }, 2000); // 2 seconds debounce
            return () => clearTimeout(timer);
        });
        return () => subscription.unsubscribe();
    }, [watch, formUuid]);

    const [showReviewModal, setShowReviewModal] = React.useState(false);
    const [reviewData, setReviewData] = React.useState({});
    const [validationErrors, setValidationErrors] = React.useState({});

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Trigger validation
        await trigger();
        const data = getValues();
        const currentErrors = methods.formState.errors; // Object of errors

        // Identify empty/error fields
        const emptyFields = Object.keys(data).filter(key => {
            const val = data[key];
            return val === undefined || val === null || val === '' || (Array.isArray(val) && val.length === 0);
        });

        // Merge errors for display in modal
        // We want to know which fields have issues to warn the user
        const issues = {};
        Object.keys(currentErrors).forEach(key => issues[key] = currentErrors[key].message);
        emptyFields.forEach(key => {
            if (!issues[key]) issues[key] = "Campo não preenchido";
        });

        setReviewData(data);
        setValidationErrors(issues);
        setShowReviewModal(true);
    };

    const handleConfirmSubmit = async () => {
        setShowReviewModal(false);
        await sendToSupabase(reviewData, true);
    };

    const observer = React.useRef(null);
    const { setCurrentStep, steps } = useFormContext();

    React.useEffect(() => {
        const options = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = steps.findIndex(step => step.id === entry.target.id);
                    if (index !== -1) {
                        setCurrentStep(index);
                    }
                }
            });
        };

        observer.current = new IntersectionObserver(handleIntersect, options);

        steps.forEach(step => {
            const element = document.getElementById(step.id);
            if (element) observer.current.observe(element);
        });

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [steps, setCurrentStep]);

    return (
        <>
            {/* Skip Links for Keyboard Navigation */}
            <SkipLink href="#main-content">Pular para o conteúdo principal</SkipLink>
            <SkipLink href="#form-navigation">Pular para navegação do formulário</SkipLink>

            {/* Live Region for Screen Reader Announcements */}
            <AnnouncementRegion />

            <div className="min-h-screen md:h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-900 md:overflow-hidden relative">

                {/* Sidebar (Desktop Only) */}
                <aside
                    id="form-navigation"
                    className="hidden md:flex flex-col w-80 h-full bg-white border-r border-gray-200 overflow-y-auto"
                    role="navigation"
                    aria-label="Navegação das etapas do formulário"
                >
                    <div className="p-6 border-b border-gray-100 flex flex-col items-center text-center">
                        <img src={`${import.meta.env.BASE_URL}logo_educafro.png`} alt="Educafro" className="h-20 w-auto object-contain mb-4" />
                        <h1 className="text-lg font-bold text-gray-900 leading-tight">Formulário Social</h1>
                        <p className="text-sm text-primary-600 font-medium mb-2">NAE 2026</p>
                        <AutosaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
                    </div>

                    <div className="p-6 overflow-y-auto flex-1">
                        <StepIndicator />
                    </div>
                </aside>

                {/* Header (Mobile Only) */}
                <header className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-30">
                    <div className="px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src={`${import.meta.env.BASE_URL}logo_educafro.png`} alt="Educafro" className="h-10 w-auto object-contain" />
                            <div>
                                <h1 className="text-sm font-bold text-gray-900 leading-tight">Formulário Social</h1>
                                <p className="text-xs text-primary-600 font-medium">NAE 2026</p>
                            </div>
                        </div>
                        {/* Compact Autosave for Mobile */}
                        <AutosaveIndicator isSaving={isSaving} lastSaved={lastSaved} />
                    </div>
                    {/* Mobile Step Indicator included inside header for stickiness */}
                    <StepIndicator />
                </header>

                {/* Main Content Area - TODAS AS SEÇÕES */}
                <main
                    id="main-content"
                    className="flex-1 w-full max-w-5xl mx-auto md:p-12 overflow-y-auto custom-scrollbar scroll-smooth"
                    role="main"
                    aria-label="Formulário Social"
                >
                    <form onSubmit={handleFormSubmit} className="space-y-8 pb-20 md:pb-0 px-4 py-8 md:p-0">

                        {/* Todas as seções renderizadas de uma vez */}
                        <div id="identificacao" className="scroll-mt-10">
                            <Identificacao />
                        </div>

                        <div id="dados_pessoais" className="scroll-mt-10">
                            <DadosPessoais />
                        </div>

                        <div id="raca_pronomes" className="scroll-mt-10">
                            <RacaPronomes />
                        </div>

                        <div id="genero_orientacao" className="scroll-mt-10">
                            <GeneroOrientacao />
                        </div>

                        <div id="escolaridade_familia" className="scroll-mt-10">
                            <EscolaridadeFamilia />
                        </div>

                        <div id="vinculo_familiar" className="scroll-mt-10">
                            <VinculoFamiliar />
                        </div>

                        <div id="moradia_internet" className="scroll-mt-10">
                            <MoradiaInternet />
                        </div>

                        <div id="trabalho_renda" className="scroll-mt-10">
                            <TrabalhoRenda />
                        </div>

                        <div id="renda_beneficios" className="scroll-mt-10">
                            <RendaBeneficios />
                        </div>

                        <div id="familia_transporte_saude" className="scroll-mt-10">
                            <FamiliaTransporteSaude />
                        </div>

                        <div id="cotidiano_objetivo" className="scroll-mt-10">
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

                {/* Review Modal */}
                <ReviewModal
                    isOpen={showReviewModal}
                    onClose={() => setShowReviewModal(false)}
                    onConfirm={handleConfirmSubmit}
                    data={reviewData}
                    validationErrors={validationErrors}
                />
            </div>
        </>
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
