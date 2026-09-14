import type { ProcessStage } from "@/types/content";

export const processStages: ProcessStage[] = [
  {
    number: "01",
    title: "Discovery",
    whatHappens:
      "We learn about your business, goals, users and constraints through structured conversations and a review of any existing systems.",
    whatClientReceives: "A clear summary of goals, scope boundaries and open questions.",
    whatsNext: "We move into strategy and define the right approach.",
  },
  {
    number: "02",
    title: "Strategy",
    whatHappens:
      "We define the technical approach, architecture and project plan — including timeline, milestones and technology choices.",
    whatClientReceives: "A project plan with scope, milestones and technical approach.",
    whatsNext: "Design work begins based on the agreed direction.",
  },
  {
    number: "03",
    title: "Design",
    whatHappens:
      "We design the interface and user experience, working in prototypes so the product can be validated before development starts.",
    whatClientReceives: "Reviewable design prototypes for key screens and flows.",
    whatsNext: "Once designs are approved, development begins.",
  },
  {
    number: "04",
    title: "Development",
    whatHappens:
      "We build the product in iterative milestones, with regular check-ins so progress stays visible throughout.",
    whatClientReceives: "Regular progress updates and access to a staging environment.",
    whatsNext: "The product moves into structured testing.",
  },
  {
    number: "05",
    title: "Testing",
    whatHappens:
      "We test functionality, performance, accessibility and security before anything reaches production.",
    whatClientReceives: "A tested build ready for review and sign-off.",
    whatsNext: "Once approved, we prepare for launch.",
  },
  {
    number: "06",
    title: "Launch",
    whatHappens:
      "We deploy the product to production, handling infrastructure, DNS and go-live checks.",
    whatClientReceives: "A live product and a walkthrough of what was delivered.",
    whatsNext: "We move into ongoing support and growth.",
  },
  {
    number: "07",
    title: "Support & Growth",
    whatHappens:
      "We remain available for fixes, updates and future iterations as your product and business evolve.",
    whatClientReceives: "An ongoing support arrangement suited to your needs.",
    whatsNext: "Your product keeps improving as your business grows.",
  },
];
