-- Desabilitar RLS temporariamente para permitir operações do service role
ALTER TABLE banners DISABLE ROW LEVEL SECURITY;

-- Ou, se preferir manter RLS ativo, criar políticas permissivas:
-- ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

-- Política para permitir SELECT para todos
-- CREATE POLICY "Allow public read access" ON banners
--   FOR SELECT
--   USING (true);

-- Política para permitir INSERT/UPDATE/DELETE com service role
-- CREATE POLICY "Allow service role full access" ON banners
--   FOR ALL
--   USING (auth.role() = 'service_role');
