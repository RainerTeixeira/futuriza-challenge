const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = 'https://lvqquqbpjreqjyfkhwur.supabase.co';
const supabaseKey = 'sb_secret_b0sIFEJLsTXXY8t7kkROAg_MHZhkR9q';
const supabase = createClient(supabaseUrl, supabaseKey);

const imagesPath = 'C:\\Users\\raine\\OneDrive\\Imagens\\imagem teste banner\\banners';

const banners = [
  {
    url: 'https://rainerteixeira.github.io/atelie-urbano/',
    slug: 'home-frete-gratis-verao26',
    image: 'home-frete-gratis-verao26.svg'
  },
  {
    url: 'https://rainerteixeira.github.io/atelie-urbano/camisa.html',
    slug: 'camisa-10off',
    image: 'camisa-10off.svg',
    start_time: new Date().toISOString(),
    end_time: new Date(Date.now() + 10 * 60 * 1000).toISOString()
  },
  {
    url: 'https://rainerteixeira.github.io/atelie-urbano/blusa.html',
    slug: 'blusa-15off-manha',
    image: 'blusa-15off-manha.svg',
    start_time: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(),
    end_time: new Date(new Date().setHours(12, 0, 0, 0)).toISOString()
  },
  {
    url: 'https://rainerteixeira.github.io/atelie-urbano/shorts.html',
    slug: 'shorts-pix-10',
    image: 'shorts-pix-10.svg'
  },
  {
    url: 'https://rainerteixeira.github.io/atelie-urbano/conjunto.html',
    slug: 'conjunto-combo',
    image: 'conjunto-combo.svg'
  },
  {
    url: 'https://rainerteixeira.github.io/atelie-urbano/saia.html',
    slug: 'saia-ultima-chance',
    image: 'saia-ultima-chance.svg'
  }
];

async function cleanAndCreateBanners() {
  console.log('🧹 Limpando banners existentes...');
  
  // Deletar todos os banners
  const { error: deleteError } = await supabase
    .from('banners')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (deleteError) {
    console.error('Erro ao limpar banners:', deleteError);
    return;
  }

  console.log('✅ Banners limpos\n');

  for (const banner of banners) {
    try {
      const imagePath = path.join(imagesPath, banner.image);
      const imageBuffer = fs.readFileSync(imagePath);
      
      const { data: { publicUrl } } = supabase.storage
        .from('banners')
        .getPublicUrl(`${banner.slug}.svg`);

      const bannerData = {
        url: banner.url,
        slug: banner.slug,
        image_url: publicUrl,
        active: true,
        start_time: banner.start_time || null,
        end_time: banner.end_time || null,
        views: 0
      };

      const { data, error } = await supabase
        .from('banners')
        .insert(bannerData)
        .select();

      if (error) {
        console.error(`Erro ao inserir ${banner.slug}:`, error);
        continue;
      }

      console.log(`✅ ${banner.slug} criado`);
    } catch (error) {
      console.error(`Erro com ${banner.slug}:`, error);
    }
  }

  console.log('\n✨ Banners únicos criados!');
}

cleanAndCreateBanners().catch(console.error);