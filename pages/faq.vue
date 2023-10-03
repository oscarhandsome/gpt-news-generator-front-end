<template>
  <h1 class="text-2xl text-center">
    FAQs - GPT Chat News Generator Application
  </h1>
  <div class="w-full px-4 pt-5">
    <div class="mx-auto w-full max-w-lg rounded-2xl bg-white p-2">
      <Disclosure v-slot="{ open }">
        <DisclosureButton
          class="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
        >
          <span
            >How to register? How do I sign up for the GPT Chat News Generator
            Application?</span
          >
          <ChevronUpIcon
            :class="open ? 'rotate-180 transform' : ''"
            class="h-5 w-5 text-blue-500"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
          <span>Registration is simple!</span>
          <ul>
            <li>
              Click on the "Sign Up" or "Register" button on our homepage.
            </li>
            <li>
              Provide the necessary details such as your email, desired
              username, and password.
            </li>
            <li>
              You may be prompted to verify your email address by clicking on a
              link we send you.
            </li>
            <li>
              Once verified, log in using your credentials and you're all set!
            </li>
          </ul>
        </DisclosurePanel>
      </Disclosure>
      <Disclosure v-slot="{ open }" as="div" class="mt-2">
        <DisclosureButton
          class="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
        >
          <span
            >Subscription rules. What are the rules for the subscription
            packages?</span
          >
          <ChevronUpIcon
            :class="open ? 'rotate-180 transform' : ''"
            class="h-5 w-5 text-blue-500"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
          <p>
            Our subscription model is designed to offer flexibility and value to
            our users. Here are the general rules:
          </p>
          <ul>
            <li>
              Free Tier: Limited to generating 5 news articles per month with a
              maximum word count of 500 words per article.
            </li>
            <li>
              Premium Tier: For a monthly fee, you get unlimited news article
              generations with up to 2000 words per article, and priority
              support.
            </li>
            <li>
              Enterprise Tier: Tailored for businesses, this tier offers API
              access, bulk news generation, and specialized support. Pricing
              varies based on requirements.
            </li>
          </ul>
          <p>
            Remember, subscriptions renew automatically. You can cancel or
            change your subscription tier from your account settings at any
            time.
          </p>
        </DisclosurePanel>
      </Disclosure>
      <Disclosure v-slot="{ open }" as="div" class="mt-2">
        <DisclosureButton
          class="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
        >
          <span
            >How it works? How does the GPT Chat News Generator Application
            function?</span
          >
          <ChevronUpIcon
            :class="open ? 'rotate-180 transform' : ''"
            class="h-5 w-5 text-blue-500"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
          <p>
            It's a combination of intuitive design and cutting-edge technology!
            Here's a simple breakdown:
          </p>
          <ul>
            <li>
              <b>Step 1:</b> Start by typing in your desired topic, focusing on
              a famous person or any theme you're interested in.
            </li>
            <li>
              <b>Step 2:</b> Specify the desired length of your news article,
              whether it's a brief summary or an elaborate piece.
            </li>
            <li>
              <b>Step 3:</b> Our system, powered by GPT, processes your request
              and in moments, generates a well-crafted news article tailored to
              your specifications.
            </li>
          </ul>
          <p>
            What you're seeing is the prowess of advanced language models at
            work, turning your input into quality news output.
          </p>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronUpIcon } from '@heroicons/vue/20/solid'
</script>
