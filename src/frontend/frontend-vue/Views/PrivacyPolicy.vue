<template>
  <LayoutComp>
    <div class="py-10 bg-white">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 bg-white">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 mb-8">
              Politique de Confidentialité et Cookies
            </h1>
            
            <div class="prose prose-lg max-w-none">
              <p class="text-gray-600 mb-6">
                <strong>Dernière mise à jour :</strong> {{ new Date().toLocaleDateString('fr-FR') }}
              </p>

              <section class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">1. Informations générales</h2>
                <p class="text-gray-700 mb-4">
                  Ce site web "taisezmoi.com" est un blog personnel tenu par Loreleï. Cette politique de confidentialité 
                  explique comment les données personnelles sont collectées, utilisées et protégées lors de votre visite.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">2. Données collectées</h2>
                
                <h3 class="text-xl font-medium text-gray-800 mb-3">2.1 Système de likes</h3>
                <p class="text-gray-700 mb-4">
                  Lorsque vous "likez" un article, le site génère un identifiant unique anonyme basé sur :
                </p>
                <ul class="list-disc pl-6 text-gray-700 mb-4">
                  <li>Horodatage de votre visite</li>
                  <li>Informations techniques de votre navigateur (user-agent)</li>
                  <li>Langue de votre navigateur</li>
                  <li>Un nombre aléatoire</li>
                </ul>
                <p class="text-gray-700 mb-4">
                  Cet identifiant est stocké dans le localStorage de votre navigateur et permet d'éviter 
                  les likes multiples. <strong>Aucune donnée personnelle identifiable n'est collectée.</strong>
                </p>

                <h3 class="text-xl font-medium text-gray-800 mb-3">2.2 Cookies de session (administration)</h3>
                <p class="text-gray-700 mb-4">
                  Des cookies de session sont utilisés uniquement pour l'authentification de l'administrateur du site. 
                  Ces cookies ne concernent pas les visiteurs lambda.
                </p>

                <h3 class="text-xl font-medium text-gray-800 mb-3">2.3 Données NON collectées</h3>
                <p class="text-gray-700 mb-4">
                  Ce site ne collecte PAS :
                </p>
                <ul class="list-disc pl-6 text-gray-700 mb-4">
                  <li>Votre adresse email</li>
                  <li>Votre nom ou prénom</li>
                  <li>Votre adresse IP de manière persistante</li>
                  <li>Vos données de géolocalisation</li>
                  <li>Données de tracking publicitaire</li>
                </ul>
              </section>

              <section class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">3. Utilisation des données</h2>
                <p class="text-gray-700 mb-4">
                  Les données collectées sont utilisées uniquement pour :
                </p>
                <ul class="list-disc pl-6 text-gray-700 mb-4">
                  <li>Permettre le fonctionnement du système de likes</li>
                  <li>Éviter les likes multiples sur un même article</li>
                  <li>Afficher le nombre total de likes par article</li>
                </ul>
                <p class="text-gray-700 mb-4">
                  <strong>Aucune donnée n'est vendue, partagée ou utilisée à des fins commerciales.</strong>
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">4. Durée de conservation</h2>
                <ul class="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>localStorage :</strong> Conservé jusqu'à suppression manuelle par l'utilisateur</li>
                  <li><strong>Base de données :</strong> Les identifiants anonymes sont conservés tant que l'article existe</li>
                  <li><strong>Cookies de session :</strong> Supprimés à la fermeture du navigateur</li>
                </ul>
              </section>

              <section class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">5. Vos droits</h2>
                <p class="text-gray-700 mb-4">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul class="list-disc pl-6 text-gray-700 mb-4">
                  <li><strong>Droit d'accès :</strong> Demander quelles données sont collectées vous concernant</li>
                  <li><strong>Droit de rectification :</strong> Corriger des données inexactes</li>
                  <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données</li>
                  <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
                </ul>
                <p class="text-gray-700 mb-4">
                  Pour exercer ces droits, vous pouvez :
                </p>
                <ul class="list-disc pl-6 text-gray-700 mb-4">
                  <li>Supprimer manuellement les données de votre localStorage</li>
                  <li>Me contacter via le formulaire de contact du site</li>
                </ul>
              </section>

              <section class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">6. Sécurité</h2>
                <p class="text-gray-700 mb-4">
                  Le site met en œuvre des mesures techniques appropriées pour protéger vos données :
                </p>
                <ul class="list-disc pl-6 text-gray-700 mb-4">
                  <li>Connexion HTTPS sécurisée</li>
                  <li>Hachage des identifiants utilisateurs</li>
                  <li>Accès restreint aux données côté serveur</li>
                </ul>
              </section>

              <section class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">7. Services tiers</h2>
                <p class="text-gray-700 mb-4">
                  Ce site n'utilise aucun service de tracking tiers (Google Analytics, Facebook Pixel, etc.). 
                  Aucune publicité ou service externe susceptible de collecter vos données n'est intégré.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">8. Contact</h2>
                <p class="text-gray-700 mb-4">
                  Pour toute question concernant cette politique de confidentialité ou vos données personnelles, 
                  vous pouvez me contacter via le formulaire de contact disponible sur le site.
                </p>
              </section>

              <section class="mb-8">
                <h2 class="text-2xl font-semibold text-gray-900 mb-4">9. Modifications</h2>
                <p class="text-gray-700 mb-4">
                  Cette politique peut être mise à jour occasionnellement. Toute modification sera datée et 
                  publiée sur cette page. Je vous encourage à consulter régulièrement cette page.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LayoutComp>
</template>

<script setup>
import LayoutComp from '../Components/LayoutComp.vue'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Politique de Confidentialité - taisezmoi.com',
  meta: [
    { name: 'description', content: 'Politique de confidentialité et de cookies du blog taisezmoi.com. Transparence sur la collecte et l\'utilisation de vos données.' },
    { name: 'robots', content: 'index, follow' }
  ]
})
</script>
