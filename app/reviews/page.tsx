import type { Metadata } from "next";
import { SiteShell } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Reviews | Utah Mediations",
  description:
    "Read reviews from Utah Mediations clients and attorneys about Dave Hunter's family law mediation work.",
};

const reviews = [
  {
    title: "Friendly, Fast, and Helpful",
    quote:
      "I had friends who said to do mediation. I had expectations that I wouldn't be happy with the outcome. To my surprise, we had a resolution rather quickly that we were both happy with. We also hired David to do the paperwork for us so that it was so simple to file with the court. I was very pleased with the outcome and now we can start to get on with our lives. Plus, often the court requires you to do mediation, so this fulfills one of those requirements. If you think you can come to an agreement on a divorce settlement, try mediation first. David was very friendly, very fast and also helpful.",
    name: "Matthew Read",
    matter: "Divorce Case",
  },
  {
    title: "Experience and Proven Track Record",
    quote:
      "I frequently use Dave as a mediator. His retainer is affordable for my clients, especially given the breadth and depth of his experience in family law matters. Dave is very knowledgeable and can provide an informed, yet neutral analysis of the current state of the law, trends, probabilities, etc. as applied to a given set of hypothetical facts, which is invaluable to participating attorneys and parties. Because of his dispute resolution skills, knowledge base, personable, authoritative, and calm demeanor, and hands-on approach, he has a proven track record of reaching settlements even in high-conflict cases. I highly recommend Dave and will continue using Dave as a mediator in my cases.",
    name: "Casey Hoyer",
    matter: "Attorney",
  },
  {
    title: "Fair Resolutions",
    quote:
      "Dave Hunter does a great job mediating divorce cases. I've been very impressed with his professionalism and his ability to work with the parties. I believe my clients have also been impressed. He takes on difficult issues and is able to work in fair resolutions. I use his services regularly.",
    name: "Scott Weight",
    matter: "Attorney",
  },
  {
    title: "Professional",
    quote:
      "Dave was professional and helped us settle our case even when I thought there was no way we were going to be able to. I would trust him with my closest friends and family.",
    name: "Jane",
    matter: "Divorce Case",
  },
  {
    title: "Supportive",
    quote:
      "Dave Hunter helped us with a private adoption. He did an excellent job and was very supportive throughout the process. The adoption went very smoothly and faster than we expected. Thanks to Hunter Law we now have a happy, healthy 1-year-old. I highly recommend Dave for all your adoption needs.",
    name: "Reuben",
    matter: "Adoption Case",
  },
  {
    title: "Quick Helpful Resolutions",
    quote:
      "I had friends who said to do mediation. I had expectations that I wouldn't be happy with the outcome. To my surprise, we had a resolution rather quickly that we were both happy with. We also hired David to do the paperwork for us so that it was so simple to file with the court. I was very pleased with the outcome and now we can start to get on with our lives. If you think you can come to an agreement on a divorce settlement, try mediation first. David was very friendly, very fast and also helpful.",
    name: "Anon",
    matter: "Divorce Case",
  },
  {
    title: "Life Saver",
    quote:
      "David was such a life saver in my divorce. He helped me get what I needed, and did it fast, efficient, and as pain free as the circumstances would allow. He was always professional. I'd use his services again if I ever needed them.",
    name: "Jill",
    matter: "Divorce Case",
  },
  {
    title: "Honest & Expert",
    quote:
      "Mr. Hunter is an expert family law attorney who is dependable, honest, and gets results in a fair and timely manner.",
    name: "Jeane",
    matter: "Divorce Case",
  },
  {
    title: "Explains Options & Experienced",
    quote:
      "Dave helped me successfully navigate a very nasty divorce. He is excellent at explaining the options and how the judge would possibly view the situation. I would recommend him to anyone who wants an experienced attorney.",
    name: "Keith",
    matter: "Divorce Case",
  },
  {
    title: "Hard-Working & Smart",
    quote:
      "Dave is hard-working, kind, loyal, and smart. His qualities remind me of those you'd find in the scout law.",
    name: "Jackie",
    matter: "Estate Planning Case",
  },
  {
    title: "Great Mediator - Maintained Neutrality",
    quote:
      "David Hunter is a great mediator. He was on time, very professional, and he maintained himself neutral. I highly recommend him.",
    name: "Anon",
    matter: "Square Customer, Divorce Case",
  },
];

export default function ReviewsPage() {
  return (
    <SiteShell>
      <section className="page-hero compact-hero reviews-hero">
        <p className="eyebrow">Reviews</p>
        <h1>Reviews for Dave Hunter.</h1>
        <p>
          Feedback from divorce, adoption, estate planning, and attorney
          mediation matters.
        </p>
      </section>

      <section className="reviews-section">
        <div className="single-review-list">
          {reviews.map((review) => (
            <article className="review-card" key={`${review.title}-${review.name}`}>
              <h3>{review.title}</h3>
              <blockquote>{review.quote}</blockquote>
              <footer>
                <strong>{review.name}</strong>
                <span>{review.matter}</span>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-band">
        <article>
          <span>Get in Touch</span>
          <a href="mailto:Dave@UtahMediations.com">Dave@UtahMediations.com</a>
        </article>
        <article>
          <span>Phone</span>
          <a href="tel:8014734444">801-473-4444</a>
        </article>
        <article>
          <span>Office</span>
          <p>Fibernet Building, 1145 S 800 E, Orem, UT 84097</p>
        </article>
      </section>
    </SiteShell>
  );
}
