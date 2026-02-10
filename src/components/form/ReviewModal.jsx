import React, { useRef, useEffect } from 'react';
import { X, CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FORM_STEPS } from '@/lib/constants'; // Need to import steps to map labels
import { useFocusTrap } from '@/hooks/useFocusTrap';

export const ReviewModal = ({ isOpen, onClose, onConfirm, data, validationErrors }) => {
    const modalRef = useRef(null);

    // Enable focus trap when modal is open
    useFocusTrap(isOpen, modalRef);

    // Handle ESC key to close modal
    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Helper to format values for display
    const formatValue = (key, value) => {
        if (!value) return <span className="text-gray-400 italic">Não informado</span>;
        if (Array.isArray(value)) return value.join(', ');
        if (value === 'true') return 'Sim';
        if (value === 'false') return 'Não';
        return value;
    };

    // Helper to find label for a key (this is tricky without a centralized schema/label map, 
    // but we can try to look up or just use the key if needed, or rely on the section structure)
    // For now, we will group by Section based on FORM_STEPS

    // We need to map fields to sections.
    const sectionsWithData = FORM_STEPS.map(step => {
        const stepFields = step.fields;
        const stepData = stepFields.map(field => ({
            key: field,
            value: data[field],
            error: validationErrors[field]
        }));
        return {
            title: step.title,
            fields: stepData
        };
    });

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div
                ref={modalRef}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
            >

                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <h2 id="modal-title" className="text-2xl font-bold text-gray-900">Revisão Final</h2>
                        <p id="modal-description" className="text-gray-500">Confira seus dados antes de enviar.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Fechar modal de revisão"
                    >
                        <X className="w-6 h-6 text-gray-500" aria-hidden="true" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">

                    {/* Validation Warning */}
                    {Object.keys(validationErrors).length > 0 && (
                        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                            <div>
                                <h3 className="font-semibold text-amber-800">Atenção: Campos pendentes</h3>
                                <p className="text-sm text-amber-700 mt-1">
                                    Existem campos não preenchidos ou com erros. Você pode enviar mesmo assim, mas recomendamos verificar.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="space-y-8">
                        {sectionsWithData.map((section, idx) => (
                            <section key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">{section.title}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    {section.fields.map((item) => (
                                        <div key={item.key} className="space-y-1">
                                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                                                {/* Try to make key readable: remove _ and capitalize */}
                                                {item.key.replace(/_/g, ' ')}
                                            </span>
                                            <div className={cn(
                                                "text-sm font-medium break-words",
                                                item.error ? "text-red-500" : "text-gray-900"
                                            )}>
                                                {formatValue(item.key, item.value)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 flex items-center justify-end gap-4 bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-200 rounded-xl transition-colors"
                    >
                        Voltar e Editar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                    >
                        <CheckCircle2 className="w-5 h-5" />
                        Confirmar e Enviar
                    </button>
                </div>
            </div>
        </div>
    );
};
