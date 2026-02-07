
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

// Cleanup após cada teste
afterEach(() => {
    cleanup();
    vi.clearAllMocks();
});

// TESTE 1: Setup básico
describe('1. Setup básico', () => {
    it('Vitest funciona', () => {
        expect(true).toBe(true);
    });
});

// TESTE 2: React Testing Library
describe('2. React Testing Library', () => {
    it('Renderiza JSX simples', () => {
        render(<div>Olá</div>);
        expect(screen.getByText('Olá')).toBeInTheDocument();
    });
});

// Mock Supabase para o teste 3
vi.mock('../lib/supabase', () => ({
    supabase: {
        from: vi.fn(() => ({
            select: vi.fn(() => Promise.resolve({ data: [], error: null })),
            upsert: vi.fn(() => Promise.resolve({ data: {}, error: null }))
        }))
    }
}));

// TESTE 3: Mock Supabase
describe('3. Mock Supabase', () => {
    it('Supabase mock existe', () => {
        const { supabase } = require('../lib/supabase');
        expect(supabase).toBeDefined();
        expect(supabase.from).toBeDefined();
    });
});

// TESTE 4: Import App
describe('4. Import App', () => {
    it('App pode ser importado', async () => {
        const AppModule = await import('../App');
        expect(AppModule.default).toBeDefined();
    });
});

// TESTE 5: Render App
describe('5. Render App', () => {
    it('App renderiza (com timeout)', async () => {
        const App = (await import('../App')).default;

        console.log('Tentando renderizar App...');
        const { container } = render(<App />);
        console.log('App renderizado!');
        expect(container).toBeTruthy();

        // Debug do que foi renderizado
        // screen.debug(undefined, 1000);
    }, 10000);
});
