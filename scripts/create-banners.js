const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuração do Supabase
const supabaseUrl = 'https://lvqquqbpjreqjyfkhwur.supabase.co';
const supabaseKey = 'sb_secret_b0sIFEJLsTXXY8t7kkROAg_MHZhkR9q';
const supabase = createClient(supabaseUrl, supabaseKey);

// Caminho das imagens
const imagesPath = 'C:\\Users\\raine\\OneDrive\\Imagens\\imagem teste banner\\banners';

// Dados dos banners
const banners = [
  {
    url: 'https://rainerteixeira.github.io/atelie-urbano/',
    slug: 'home-frete-gratis-verao26',
    image: 'home-frete-gratis-verao26.svg',
    active: true
  },
  {
    url: 'https://rainerteixeira.github.io/atelie-urbano/camisa.html',
    slug: 'camisa-10off',
    image: 'camisa-10off.svg',
    active: true,
    start_time: new Date().toISOString(),
    end_time: new Date(Date.now() + 10 * 60 * 1000).toISOString() // +10min
  },
  {
    url: 'https://rainerteixeira.github.io/atelie-urbano/blusa.html',
    slug: 'blusa-15off-manha',
    image: 'blusa-15off-manha.svg',
    active: true,
    start_time: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(),
    end_time: new Date(new Date().setHours(12, 0, 0, 0)).toISOString()
  },
  {
    url: 'https://rainerteixeira.github.io/atelie-urbano/shorts.html',
    slug: 'shorts-pix-10',
    image: 'shorts-pix-10.svg',
    active: true
  },
  {
    url: 'https://rainerteixeira.github.io/atelie-urbano/conjunto.html',
    slug: 'conjunto-combo',
    image: 'conjunto-combo.svg',
    active: true
  },
  {
    url: 'https://rainerteixeira.github.io/atelie-urbano/saia.html',
    slug: 'saia-ultima-chance',
    image: 'saia-ultima-chance.svg',
    active: true
  }
];

async function uploadImageAndCreateBanner(banner) {
  try {
    // Ler arquivo da imagem
    const imagePath = path.join(imagesPath, banner.image);
    const imageBuffer = fs.readFileSync(imagePath);
    
    // Upload da imagem para Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('banners')
      .upload(`${banner.slug}.svg`, imageBuffer, {
        contentType: 'image/svg+xml',
        upsert: true
      });

    if (uploadError) {
      console.error(`Erro no upload da imagem ${banner.image}:`, uploadError);
      return;
    }

    // Obter URL pública da imagem
    const { data: { publicUrl } } = supabase.storage
      .from('banners')
      .getPublicUrl(`${banner.slug}.svg`);

    // Preparar dados do banner
    const bannerData = {
      url: banner.url,
      slug: banner.slug,
      image_url: publicUrl,
      active: banner.active,
      start_time: banner.start_time || null,
      end_time: banner.end_time || null,
      views: 0
    };

    // Inserir banner no banco
    const { data: insertData, error: insertError } = await supabase
      .from('banners')
      .insert(bannerData)
      .select();

    if (insertError) {
      console.error(`Erro ao inserir banner ${banner.slug}:`, insertError);
      return;
    }

    console.log(`✅ Banner criado: ${banner.slug}`);
    console.log(`   URL: ${banner.url}`);
    console.log(`   Imagem: ${publicUrl}`);
    console.log(`   Ativo: ${banner.active}`);
    if (banner.start_time) console.log(`   Início: ${new Date(banner.start_time).toLocaleString()}`);
    if (banner.end_time) console.log(`   Fim: ${new Date(banner.end_time).toLocaleString()}`);
    console.log('');

  } catch (error) {
    console.error(`Erro geral para banner ${banner.slug}:`, error);
  }
}

async function createAllBanners() {
  console.log('🚀 Iniciando criação dos banners...\n');
  
  for (const banner of banners) {
    await uploadImageAndCreateBanner(banner);
  }
  
  console.log('✨ Todos os banners foram criados!');
  console.log('\n📋 Para testar:');
  console.log('1. Acesse: https://rainerteixeira.github.io/atelie-urbano/');
  console.log('2. Verifique se o banner aparece');
  console.log('3. Teste outras páginas (camisa.html, blusa.html, etc.)');
  console.log('4. Acesse o admin: http://localhost:3000/admin');
}

createAllBanners().catch(console.error);