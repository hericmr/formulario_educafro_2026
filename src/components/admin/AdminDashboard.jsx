import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
    Search,
    Filter,
    Eye,
    Download,
    RefreshCcw,
    ChevronLeft,
    ChevronRight,
    User,
    Calendar,
    CheckCircle2,
    Clock
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AdminEntryDetails } from './AdminEntryDetails';

export function AdminDashboard() {
    const [entrevistas, setEntrevistas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('todos');
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            let query = supabase
                .from('entrevistas')
                .select('*')
                .order('created_at', { ascending: false });

            const { data, error } = await query;

            if (error) throw error;
            setEntrevistas(data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredData = entrevistas.filter(item => {
        const matchesSearch =
            (item.nome_completo?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (item.cpf?.includes(searchTerm));

        const matchesStatus = statusFilter === 'todos' || item.status_formulario === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status) => {
        if (status === 'completo') {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <CheckCircle2 className="w-3 h-3" /> Completo
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <Clock className="w-3 h-3" /> Rascunho
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Painel de Entrevistas</h1>
                        <p className="text-gray-500">Gerencie e visualize as respostas do formulário NAE 2026</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchData}
                            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-gray-200"
                            title="Atualizar"
                        >
                            <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <Download className="w-4 h-4" /> Exportar CSV
                        </button>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-sm font-medium text-gray-500 mb-1">Total de Entrevistas</div>
                        <div className="text-2xl font-bold text-gray-900">{entrevistas.length}</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-sm font-medium text-gray-500 mb-1">Completas</div>
                        <div className="text-2xl font-bold text-green-600">
                            {entrevistas.filter(e => e.status_formulario === 'completo').length}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <div className="text-sm font-medium text-gray-500 mb-1">Rascunhos</div>
                        <div className="text-2xl font-bold text-yellow-600">
                            {entrevistas.filter(e => e.status_formulario === 'rascunho' || !e.status_formulario).length}
                        </div>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nome, email ou CPF..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all font-sans"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="w-5 h-5 text-gray-400" />
                            <select
                                className="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all bg-white font-sans text-sm"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="todos">Todos os Status</option>
                                <option value="completo">Completo</option>
                                <option value="rascunho">Rascunho</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Candidato</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contato / CPF</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Entrevistador</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Data/Hora</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <RefreshCcw className="w-8 h-8 animate-spin text-primary-500" />
                                                <p>Carregando dados...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                            Nenhum resultado encontrado.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                                                        {item.nome_completo?.charAt(0) || '?'}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900">{item.nome_completo || 'Sem nome'}</div>
                                                        <div className="text-xs text-gray-500">{item.cidade || 'Cidade não inf.'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{item.email || '-'}</div>
                                                <div className="text-xs text-gray-500">{item.cpf || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-700">{item.entrevistador || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {item.created_at ? format(new Date(item.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR }) : '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(item.status_formulario)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-all"
                                                    onClick={() => setSelectedEntry(item)}
                                                >
                                                    <Eye className="w-4 h-4" /> Detalhes
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Placeholder */}
                    <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
                        <div className="text-sm text-gray-500">
                            Mostrando <span className="font-medium">{filteredData.length}</span> de <span className="font-medium">{entrevistas.length}</span> resultados
                        </div>
                        <div className="flex items-center gap-2">
                            <button disabled className="p-2 border border-gray-200 rounded-lg bg-white text-gray-400 cursor-not-allowed">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button disabled className="p-2 border border-gray-200 rounded-lg bg-white text-gray-400 cursor-not-allowed">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Modal */}
            {selectedEntry && (
                <AdminEntryDetails
                    data={selectedEntry}
                    onClose={() => setSelectedEntry(null)}
                />
            )}
        </div>
    );
}

export default AdminDashboard;
