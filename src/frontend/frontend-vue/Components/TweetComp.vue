<template>
    <ol>
        <li v-for="(tweet, index) in tweets" :key="index">
            <div class="flex items-center justify-between"> <!-- Ajoutez justify-between ici -->
                <div class="flex items-center">
                    <img src="@/assets/images/profile-pic.webp" alt="photo de profil" class="rounded-full w-10 m-5">
                    <div class="-ml-2 md:-mt-3 text-sm flex flex-col md:flex-row">
                        <span class="text-white font-bold">Loreleï 🦕</span>
                        <span class="text-gray-400 font-normal">@taisezmoi · 2h</span>
                    </div>
                </div>
                <i class="fa-solid fa-ellipsis text-gray-400 pb-5 md:pb-2 pr-5"></i>
            </div>
            <p
                class="pl-2 ml-16 mr-5 -mt-3 md:-mt-7 max-w-full md:max-w-[80%] overflow-hidden break-words text-white text-sm">
                {{ tweet.content }}</p>
            <div class="border-b border-gray-700 mt-5"></div>
        </li>
    </ol>
</template>

<script setup>
const tweets = [
    {
        content: "Bienvenue sur ma page À propos ! J'étais pas bien sûre de quoi faire de cette page, alors j'ai décidé de faire un clone Twitter, vu que c'est quand même là que tout a commencé."
    },
    {
        content: "Exceptionnellement, l'ordre de lecture est inversé, donc ça se lit comme une page normale et non un profil Twitter. En gros ça se lit normalement de haut en bas."
    },
    {
        content: "Je suis une Bac L, option Arts, et honnêtement j'ai jamais trop su quoi faire de ma vie avant. J'ai été caissière, secrétaire en maison de retraite, j'ai fait du porte à porte pour vendre des aspirateurs... etc."
    },
    {
        content: "Ce qui a vraiment compté, pour moi, c'est mes années en cuisine. CAP puis début de BTS Hôtellerie Restauration en alternance puis quelques années derrière les fourneaux de plusieurs établissements."
    },
    {
        content: "Tout ça c'était bien beau le temps que ça a duré (avant un burnout), mais je ne me voyais pas y faire mes vieux os (qui n'auraient pas tenu le coup)."
    },
    {
        content: "C'est un peu par hasard et avec beaucoup de chance que j'ai donc décidé / commencé cette reconversion dans le dev web, en 2022."
    },
]
</script>