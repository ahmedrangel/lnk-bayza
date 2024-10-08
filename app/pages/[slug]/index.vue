<script setup>
const { params } = useRoute();
const { slug } = params;

for (const r of redirects) {
  if (r.slug === slug.toLowerCase()) {
    await navigateTo(r.url, { external: true });
  }
}

const { data: data } = await useFetch("https://bayzamusic.com/api/fanlinks/" + slug).catch(() => null);

if (!data.value) {
  throw createError({
    statusCode: 404,
    message: `Fanlink not found: '${slug}'`,
    fatal: true
  });
}

const info = data.value;
const fanlink = info.fanlinks;

const title = `${info.title} by ${info.artists} | Fanlink`;
const image = `https://bayzamusic.com${info.image}`;

useSeoMeta({
  title: title,
  description: "Bayza Fanlink",
  ogUrl: SITE.url + "/" + slug.toLowerCase(),
  ogType: "website",
  ogSiteName: "Bayza",
  ogDescription: "Bayza Fanlink",
  ogImage: image,
  ogImageWidth: 500,
  ogImageHeight: 500,
  ogImageAlt: title,
  twitterCard: "summary",
  twitterTitle: title,
  twitterDescription: "Bayza Fanlink",
  twitterImage: image,
  twitterSite: "@bayzamusic"
});

useHead({
  link: [{ rel: "canonical", href: SITE.url + "/" + slug.toLowerCase() }]
});

const { $bootstrap, $Tooltip } = useNuxtApp();

const copyToClipboard = () => {
  const text_to_copy = window.location.href;
  navigator.clipboard.writeText(text_to_copy);
  const element = document.querySelector(".copy-to-clipboard");
  element.style.opacity = "100%";
  element.removeAttribute("data-bs-original-title");
  $Tooltip.getInstance(element).dispose();
  const copied_element = document.querySelector(".copied");
  copied_element.classList.remove("d-none");
  const instance = $Tooltip.getInstance(copied_element);
  if (!instance) {
    new $Tooltip(copied_element, { trigger: "manual" }).show();
  }
};

const handleMouseUp = (e) => {
  const element = document.querySelector(".copy-to-clipboard");
  const copied_element = document.querySelector(".copied");
  const instance = $Tooltip.getInstance(copied_element);
  if (instance) {
    if (!copied_element.contains(e.target)) {
      element.style.opacity = "70%";
      copied_element.classList.add("d-none");
      instance.dispose();
    }
    element.setAttribute("data-bs-original-title", "Copy to clipboard");
    $bootstrap.initializeTooltip();
  }
};

onMounted(() => {
  addEventListener("mouseup", e => handleMouseUp(e));
});

onBeforeUnmount(() => {
  removeEventListener("mouseup", e => handleMouseUp(e));
});
</script>

<template>
  <main v-if="info" class="container">
    <div class="bg-fanlink h-100 position-fixed start-0 end-0" :style="{ 'background-image': 'url(' + image + ')' }" />
    <div class="d-flex justify-content-center align-items-center py-3">
      <div class="col-lg-4">
        <div class="card overflow-hidden border-0 bg-dark">
          <div class="position-relative">
            <img class="img-fluid w-100" :src="image">
            <div class="p-0 position-absolute copy-to-clipboard d-flex justify-content-center align-items-center" data-bs-toggle="tooltip" data-bs-placement="left" title="Copy to clipboard" @click="copyToClipboard()">
              <span>
                <Icon class="copied d-none position-absolute top-50 start-50 translate-middle" name="fa6-solid:check" style="font-size: 26px; color: #1cc88a;" data-bs-toggle="tooltip-copied" data-bs-placement="bottom" title="Copied!" />
                <Icon name="fa6-solid:copy" />
              </span>
            </div>
          </div>
          <div class="p-3 text-center">
            <h5>{{ info.title }}</h5>
            <h6 class="mb-0">{{ info.artists }}</h6>
          </div>
          <template v-for="(p, i) of platforms" :key="i">
            <div v-if="fanlink[p.id]" class="d-flex justify-content-center align-items-center border-top">
              <div class="col-6 py-3 ps-4 text-center">
                <img :src="`/images/${p.image}`" width="90%">
              </div>
              <div class="col-6 py-3 text-center">
                <a v-if="fanlink[p.id + '-buy']" class="text-white" :href="fanlink[p.id + '-buy']" target="_blank" :title="`Buy on ${p.name}`">
                  <span class="btn btn-outline-light">Buy</span>
                </a>
                <a v-if="p.id === 'amazon-music' && fanlink['amazon']" class="text-white" :href="fanlink['amazon']" target="_blank" :title="`Buy on ${p.name}`">
                  <span class="btn btn-outline-light">Buy</span>
                </a>
                <span v-if="(fanlink[p.id + '-buy'] || p.id === 'amazon-music') && fanlink[p.id]" class="mx-1" />
                <a class="text-white" :href="fanlink[p.id]" target="_blank" :title="`${p.id === 'tiktok' ? 'Use Sound' : `Stream on ${p.name}`}`">
                  <span v-if="p.id === 'tiktok'" class="btn btn-outline-light">Use Sound</span>
                  <span v-else class="btn btn-outline-light">Stream</span>
                </a>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div :class="`${fanlink.dark ? 'text-dark' : 'text-white'}`">
      <h5 class="mb-2 position-fixed start-0 bottom-0 d-lg-flex d-none ps-3">
        <a target="_blank" :href="SITE.main_url">{{ SITE.domain }}</a>
      </h5>
      <h6 class="mb-4 pb-3 position-fixed end-0 bottom-0 d-lg-flex d-none pe-3">Follow Bayza</h6>
      <div class="position-fixed end-0 bottom-0 d-lg-flex d-none">
        <ul class="mb-2">
          <li v-for="(el, i) of SITE.external_links" :key="i" class="d-inline-block pe-3">
            <h5 class="mb-0">
              <a target="_blank" :href="el.url">
                <Icon :name="el.icon" />
              </a>
            </h5>
          </li>
        </ul>
      </div>
      <div class="end-0 bottom-0 d-lg-none d-block">
        <ul class="my-4 p-0 text-center ps-3">
          <li v-for="(el, i) of SITE.external_links" :key="i" class="d-inline-block pe-3">
            <h3 class="mb-0">
              <a target="_blank" :href="el.url">
                <Icon :name="el.icon" />
              </a>
            </h3>
          </li>
        </ul>
        <h4 class="my-4 start-0 d-lg-none d-block text-center">
          <a target="_blank" :href="SITE.main_url">{{ SITE.domain }}</a>
        </h4>
      </div>
    </div>
  </main>
</template>
