-- Criar usuário admin para testes
-- Execute este SQL no Supabase Dashboard > SQL Editor

-- Criar usuário (substitua email e senha)
-- Nota: Use o Supabase Dashboard > Authentication > Users > Add User
-- ou execute via API

-- Exemplo de como criar via SQL (requer permissões especiais):
-- INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
-- VALUES ('admin@example.com', crypt('sua-senha-aqui', gen_salt('bf')), now());

-- Alternativamente, use o Supabase Dashboard:
-- 1. Vá em Authentication > Users
-- 2. Clique em "Add User"
-- 3. Preencha email e senha
-- 4. Confirme o email automaticamente

-- Para desenvolvimento, você pode desabilitar confirmação de email:
-- Dashboard > Authentication > Settings > Email Auth > Disable email confirmations
