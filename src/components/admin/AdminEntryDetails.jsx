import React from 'react';
import {
    X,
    User,
    MapPin,
    Calendar,
    Phone,
    Mail,
    FileText,
    Home,
    Briefcase,
    GraduationCap,
    Heart,
    Info,
    Target,
    HelpCircle
} from 'lucide-react';

export function AdminEntryDetails({ data, onClose }) {
    if (!data) return null;

    const sections = [
        {
            title: 'Identificação e Dados Pessoais',
            icon: <User className="w-5 h-5 text-primary-600" />,
            fields: [
                { label: 'Nome Completo', value: data.nome_completo },
                { label: 'Nome no Documento?', value: data.nome_mesmo_documento },
                { label: 'Nome Civil', value: data.nome_civil_documento },
                { label: 'E-mail', value: data.email },
                { label: 'Telefone', value: data.telefone },
                { label: 'CPF', value: data.cpf },
                { label: 'RG', value: data.rg },
                { label: 'Data de Nascimento', value: data.data_nascimento },
                { label: 'Estado Civil', value: data.estado_civil },
                { label: 'Entrevistador', value: data.entrevistador },
                { label: 'Data da Entrevista', value: data.data_entrevista },
            ]
        },
        {
            title: 'Endereço e Moradia',
            icon: <Home className="w-5 h-5 text-primary-600" />,
            fields: [
                { label: 'Cidade', value: data.cidade || data.cidade_outra },
                { label: 'Bairro', value: data.bairro },
                { label: 'Endereço', value: data.endereco },
                { label: 'Naturalidade', value: data.naturalidade },
                { label: 'Condição de Moradia', value: data.condicao_moradia },
                { label: 'Tipo de Construção', value: data.tipo_construcao },
            ]
        },
        {
            title: 'Identidade e Social',
            icon: <Heart className="w-5 h-5 text-primary-600" />,
            fields: [
                { label: 'Raça/Cor', value: data.raca_cor },
                { label: 'Pronomes', value: data.pronomes },
                { label: 'Gênero', value: data.genero },
                { label: 'Orientação Sexual', value: data.orientacao_sexual },
            ]
        },
        {
            title: 'Educação e Carreira',
            icon: <GraduationCap className="w-5 h-5 text-primary-600" />,
            fields: [
                { label: 'Escolaridade', value: data.especifique_escolaridade },
                { label: 'Ano de Conclusão', value: data.ano_conclusao },
                { label: 'Escola de Origem', value: data.escola_origem },
                { label: 'Vínculo de Trabalho', value: data.vinculo_trabalho },
                { label: 'Renda Familiar', value: data.renda_familiar },
                { label: 'Benefícios', value: data.beneficios },
            ]
        },
        {
            title: 'Outras Informações',
            icon: <Info className="w-5 h-5 text-primary-600" />,
            fields: [
                { label: 'Objetivo na Educafro', value: data.objetivo_educafro },
                { label: 'Tipo Sanguíneo', value: data.tipo_sanguineo },
                { label: 'Internet', value: data.internet_acesso },
                { label: 'Transporte', value: data.meio_transporte },
                { label: 'Status do Formulário', value: data.status_formulario },
            ]
        }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Detalhes da Entrevista</h2>
                        <p className="text-sm text-gray-500">ID: {data.form_uuid || data.id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white border border-transparent hover:border-gray-200 rounded-lg transition-all text-gray-500"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                    <div className="space-y-8">
                        {sections.map((section, idx) => (
                            <div key={idx} className="space-y-4">
                                <h3 className="flex items-center gap-2 text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">
                                    {section.icon}
                                    {section.title}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                    {section.fields.map((field, fIdx) => (
                                        <div key={fIdx} className="space-y-1">
                                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{field.label}</span>
                                            <div className="text-gray-900 font-medium bg-gray-50/50 p-2 rounded-lg border border-gray-100 min-h-[40px] flex items-center">
                                                {field.value || <span className="text-gray-300 italic">Não informado</span>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 font-sans">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-white transition-all shadow-sm active:scale-95"
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminEntryDetails;
