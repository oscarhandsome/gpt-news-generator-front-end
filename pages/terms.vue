<script lang="ts" setup>
// Page metadata
const title = ref('Terms and Conditions - GPT Chat News Generator Application')
const description = ref(
  'Terms and Conditions for GPT Chat News Generator Application',
)

// This will be reactive even you change title/description above
useHead({
  title,
  meta: [
    {
      name: 'description',
      content: description,
    },
  ],
})

const config = useRuntimeConfig()
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-semibold mb-4">Terms and Conditions</h1>

    <section class="mb-6">
      <p>Last updated: {{ config.public.dateTimeTerms }}</p>

      <p>
        Please read these Terms and Conditions ("Terms", "Terms and Conditions")
        carefully before using the GPT Chat News Generator Application (the
        "Service") operated by [Your Company Name] ("us", "we", or "our").
      </p>
    </section>

    <!-- Terms and Conditions Content -->
    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
      <p>
        By accessing or using the Service, you agree to be bound by these Terms.
        If you disagree with any part of the terms, then you may not access the
        Service.
      </p>
    </section>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">2. Use of the Service</h2>

      <h3 class="text-base mb-2">2.1. Account Registration</h3>
      <p>
        To use the Service, you may be required to create an account. You agree
        to provide accurate, current, and complete information during the
        registration process and to update such information to keep it accurate,
        current, and complete.
      </p>

      <h3 class="text-base mb-2">2.2. User Conduct</h3>
      <p>
        You are responsible for maintaining the confidentiality of your account
        credentials and for all activities that occur under your account. You
        agree not to:
      </p>

      <ul>
        <li>- Use the Service for any illegal or unauthorized purpose.</li>
        <li>
          - Violate any laws in your jurisdiction (including but not limited to
          copyright laws).
        </li>
        <li>
          - Use the Service to generate content that is harmful, offensive, or
          violates the rights of others.
        </li>
        <li>
          - Attempt to gain unauthorized access to or disrupt any part of the
          Service.
        </li>
      </ul>

      <h3 class="text-base mb-2">2.3. Content Generated</h3>
      <p>
        The Service allows users to generate news articles. You are solely
        responsible for the content generated using the Service. We do not
        guarantee the accuracy, completeness, or suitability of the generated
        content.
      </p>

      <h3 class="text-base mb-2">2.4. Subscription</h3>

      <p>
        The use of certain features of the Service may require a subscription
        fee. Subscription terms and rules are outlined in our Subscription Rules
        section.
      </p>
    </section>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">3. Changes to the Terms</h2>

      <p>
        We reserve the right to modify or replace these Terms at any time.
        Changes to the Terms will be posted on this page. By continuing to use
        the Service after any changes, you agree to be bound by the revised
        Terms.
      </p>
    </section>

    <section class="mb-6">
      <h2 class="text-xl font-semibold mb-2">4. Contact Us</h2>

      <p>
        If you have any questions about these Terms and Conditions, please
        contact us at [Your Contact Information].
      </p>

      <p>
        These Terms and Conditions have been generated for general informational
        purposes and should not be considered as legal advice. For specific
        legal advice related to your situation, please consult with a legal
        professional.
      </p>
    </section>

    <p>
      © 2023 | GPT Chat News Generator Application. |
      <a href="http://elbargo.ru/" class="hover:underline">Elbargo™</a>. All
      Rights Reserved.
    </p>
  </div>
</template>
