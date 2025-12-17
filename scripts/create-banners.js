/**
 * @fileoverview Script for creating banners with image upload to Supabase Storage
 * @module scripts/create-banners
 * @description Uploads banner images to Supabase Storage and creates corresponding database entries
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

/** @type {string} Supabase project URL */
const supabaseUrl = 'https://lvqquqbpjreqjyfkhwur.supabase.co';

/** @type {string} Supabase service role key for server operations */
const supabaseKey = 'sb_secret_b0sIFEJLsTXXY8t7kkROAg_MHZhkR9q';

/** @type {import('@supabase/supabase-js').SupabaseClient} Supabase client instance */
const supabase = createClient(supabaseUrl, supabaseKey);

/** @type {string} Local path to banner images directory */
const imagesPath = 'C:\\Users\\raine\\OneDrive\\Imagens\\imagem teste banner\\banners';

/**
 * Banner configuration data for Ateliê Urbano demo
 * @type {Array<Object>} Array of banner objects with URL, slug, image, and timing data
 */
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

/**
 * Uploads banner image to Supabase Storage and creates database entry
 * @async
 * @function uploadImageAndCreateBanner
 * @param {Object} banner - Banner configuration object
 * @param {string} banner.url - Target URL for the banner
 * @param {string} banner.slug - URL-friendly banner identifier
 * @param {string} banner.image - Local image filename
 * @param {boolean} banner.active - Whether banner is active
 * @param {string} [banner.start_time] - ISO string for banner start time
 * @param {string} [banner.end_time] - ISO string for banner end time
 * @returns {Promise<void>}
 * @description Reads local image file, uploads to Supabase Storage, and creates database record
 */
async function uploadImageAndCreateBanner(banner) {
  try {
    /** @type {string} Full path to the local image file */
    const imagePath = path.join(imagesPath, banner.image);
    /** @type {Buffer} Image file buffer for upload */
    const imageBuffer = fs.readFileSync(imagePath);
    
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

    /** @type {string} Public URL for the uploaded image */
    const { data: { publicUrl } } = supabase.storage
      .from('banners')
      .getPublicUrl(`${banner.slug}.svg`);

    /** @type {Object} Banner data object for database insertion */
    const bannerData = {
      url: banner.url,
      slug: banner.slug,
      image_url: publicUrl,
      active: banner.active,
      start_time: banner.start_time || null,
      end_time: banner.end_time || null,
      views: 0
    };

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

/**
 * Main function to create all banners sequentially
 * @async
 * @function createAllBanners
 * @returns {Promise<void>}
 * @description Iterates through banner configuration array and creates each banner
 */
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