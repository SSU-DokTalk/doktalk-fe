import type { LegalDocuments } from '../types';

/** 영어 번역본. 한국어 원문(kr.ts)과 같은 구성이에요. 원문을 고치면 같이 고쳐요. */
const TRANSLATION_NOTE =
  'This is a translation of the Korean original. If the two differ, the Korean original prevails.';

const documents: LegalDocuments = {
  terms: {
    title: 'Terms of Service',
    preface: [TRANSLATION_NOTE],
    sections: [
      {
        heading: 'Article 1 (Purpose)',
        blocks: [
          'These Terms set out the rights, obligations and responsibilities of [Company name] (the "Company") and its members for the use of DokTalk (讀:TALK, the "Service"), a book discussion community operated by the Company.',
        ],
      },
      {
        heading: 'Article 2 (Definitions)',
        blocks: [
          {
            ordered: true,
            items: [
              '"Member" means a person who has agreed to these Terms and signed up for the Service.',
              '"Post" means any writing, summary, discussion, comment, photo, file or other content a member uploads to the Service.',
              '"Summary" means a post in which a member summarizes a book. It may have a part anyone can read and a part that requires payment (the "paid part").',
              '"Discussion" means a post in which a member (the "host") chooses a book and opens an online or offline meetup.',
              '"Paid services" means services used for a fee, such as reading the paid part of a summary or joining a paid discussion.',
            ],
          },
        ],
      },
      {
        heading: 'Article 3 (Posting and Amendment of the Terms)',
        blocks: [
          {
            ordered: true,
            items: [
              'The Company posts these Terms in the Service where members can easily find them.',
              'The Company may amend these Terms within the limits of applicable law. It announces the effective date and the reasons in the Service at least 7 days before the effective date (30 days for changes unfavorable to members).',
              'Members who do not agree to the amended Terms may close their accounts. If the Company announced that members who do not object by the effective date will be deemed to agree, and a member does not object, the member is deemed to agree to the amended Terms.',
            ],
          },
        ],
      },
      {
        heading: 'Article 4 (Sign-up)',
        blocks: [
          {
            ordered: true,
            items: [
              'Only people aged 14 or older may sign up for the Service.',
              'You can sign up with an email address or with a Kakao, Google, Naver or Facebook account. Sign-up is complete once you agree to these Terms and to the collection and use of personal information, and confirm that you are 14 or older.',
              "If someone signs up with another person's information or with false information, the Company may refuse the sign-up or restrict use of the Service.",
            ],
          },
        ],
      },
      {
        heading: 'Article 5 (Member Information and Account Security)',
        blocks: [
          {
            ordered: true,
            items: [
              'Members can edit their nickname, profile photo, introduction and other member information in the Service or by asking the Company.',
              'Members must keep their account and password secure and must not let others use them. Members who find that their account has been stolen must tell the Company immediately.',
            ],
          },
        ],
      },
      {
        heading: 'Article 6 (Closing Accounts and Restrictions)',
        blocks: [
          {
            ordered: true,
            items: [
              'Members may close their accounts at any time on the settings page.',
              'A closed account can be restored by logging in with it within [period]. After that, it is handled according to the Privacy Policy.',
              'If a member engages in any prohibited act under Article 12, the Company may hide or delete the post concerned and, depending on the case, restrict use of the Service or suspend the account.',
            ],
          },
        ],
      },
      {
        heading: 'Article 7 (Services)',
        blocks: [
          'The Company provides the following services.',
          {
            items: [
              'Book search and My Library',
              'Writing posts, summaries and discussions, and comments, likes and follows',
              'Paid services such as reading the paid part of summaries and joining paid discussions',
              'A reading assistant chatbot',
              'Other services the Company announces',
            ],
          },
        ],
      },
      {
        heading: 'Article 8 (Changes to and Suspension of the Service)',
        blocks: [
          {
            ordered: true,
            items: [
              'The Company may change or discontinue all or part of the Service for operational or technical reasons, and announces this in the Service in advance. If advance notice is not possible for unavoidable reasons, it may announce this afterwards.',
              'The Company may suspend the Service temporarily for maintenance, outages, natural disasters and similar reasons.',
            ],
          },
        ],
      },
      {
        heading: 'Article 9 (Paid Services and Payment)',
        blocks: [
          {
            ordered: true,
            items: [
              'Prices of paid services are set by the summary author or the discussion host and shown on the checkout screen.',
              'Payments are processed through the Toss Payments service. The Company does not store card numbers or other payment details.',
              'Once a payment is approved, you can read the paid part of the summary, or you are registered as a participant of the discussion.',
              'A discussion cannot be joined once it reaches its capacity, which includes the host.',
              '[Sales structure: state whether the Company is the seller or a mail-order intermediary with authors and hosts as sellers, with the matching notices and settlement terms.]',
            ],
          },
        ],
      },
      {
        heading: 'Article 10 (Withdrawal and Refunds)',
        blocks: [
          {
            ordered: true,
            items: [
              'The paid part of a summary is digital content available right after payment. Once you start reading it, withdrawal may be restricted under the Korean Act on Consumer Protection in Electronic Commerce. The Company tells you this before payment.',
              'Discussion fees are refunded according to the following criteria. [Refund criteria: e.g. a full refund if cancelled ○ days before the meetup]',
              'If the host cancels the discussion or the meetup does not take place, the full fee is refunded.',
              'Refunds are made to the original payment method and may take [processing time] depending on the method.',
            ],
          },
        ],
      },
      {
        heading: 'Article 11 (Rights to Posts)',
        blocks: [
          {
            ordered: true,
            items: [
              'The copyright in a post belongs to the member who uploaded it.',
              'Members allow the Company to use their posts free of charge (reproduce, display, transmit and so on) to the extent needed to operate and promote the Service. This permission ends when the member deletes the post.',
              'When uploading a summary, members must keep quotations within fair limits so as not to infringe the copyright of the original work.',
            ],
          },
        ],
      },
      {
        heading: 'Article 12 (Prohibited Acts)',
        blocks: [
          'Members must not:',
          {
            ordered: true,
            items: [
              "use another person's information or register false information;",
              'upload posts that infringe copyright or other rights of others (including summaries that copy excessive parts of a book);',
              'upload abusive, hateful, obscene, violent or illegal content;',
              'harass or threaten other participants in discussion meetups;',
              'use the Service for advertising or commercial purposes without the permission of the Company;',
              'disrupt the operation of the Service through hacking, automated mass requests or similar means.',
            ],
          },
        ],
      },
      {
        heading: 'Article 13 (Discussion Meetups)',
        blocks: [
          {
            ordered: true,
            items: [
              'Discussion meetups are run by the host and the participants. The Company provides a service for opening meetups and, unless it is at fault intentionally or negligently, is not responsible for how meetups are run or for disputes between participants.',
              'Please take care of your personal safety and belongings at offline meetups.',
            ],
          },
        ],
      },
      {
        heading: 'Article 14 (Chatbot)',
        blocks: [
          {
            ordered: true,
            items: [
              'Chatbot answers are generated by artificial intelligence and may be inaccurate.',
              'What you type into the chatbot is sent to an external AI service (Google Gemini) to generate answers. Please do not enter personal information.',
            ],
          },
        ],
      },
      {
        heading: 'Article 15 (Limitation of Liability)',
        blocks: [
          {
            ordered: true,
            items: [
              'The Company is not liable when it cannot provide the Service because of force majeure such as natural disasters.',
              'The Company is not responsible for the accuracy or reliability of posts uploaded by members.',
              'The Company is not liable for problems in using the Service caused by the member.',
              'However, the above does not apply to damage caused by the intent or gross negligence of the Company.',
            ],
          },
        ],
      },
      {
        heading: 'Article 16 (Dispute Resolution)',
        blocks: [
          {
            ordered: true,
            items: [
              'These Terms are governed by the laws of the Republic of Korea.',
              'Disputes about the use of the Service are brought before the court with jurisdiction under the Korean Civil Procedure Act.',
            ],
          },
        ],
      },
      {
        heading: 'Addendum',
        blocks: ['These Terms take effect on [effective date].'],
      },
      {
        heading: 'Company Information',
        blocks: [
          {
            items: [
              'Company name: [Company name]',
              'Representative: [Representative]',
              'Business registration number: [Number]',
              'Mail-order business report number: [Number]',
              'Address: [Address]',
              'Customer support: [Email], [Phone]',
            ],
          },
        ],
      },
    ],
  },

  privacy: {
    title: 'Privacy Policy',
    preface: [
      TRANSLATION_NOTE,
      '[Company name] (the "Company") sets out this Privacy Policy under the Korean Personal Information Protection Act to protect the personal information of users of DokTalk (讀:TALK, the "Service") and to handle related concerns promptly.',
    ],
    sections: [
      {
        heading: '1. Purposes of Processing',
        blocks: [
          'The Company processes personal information for the following purposes. If a purpose changes, the Company asks for consent in advance.',
          {
            items: [
              'Sign-up and account management: identifying members, confirming the intent to sign up, confirming that members are 14 or older, preventing misuse',
              'Providing the Service: publishing posts, follows, My Library, chatbot answers',
              'Paid services: confirming payments, keeping purchase history, refunds',
              'Improving the Service: suggesting discussions and summaries that match your interests',
              'Marketing messages: only for members who opt in (see "Marketing Messages" below)',
            ],
          },
        ],
      },
      {
        heading: '2. Personal Information We Process',
        blocks: [
          {
            items: [
              'Email sign-up (required): email address, password (stored with one-way encryption), nickname',
              'Social sign-up (required): member identifier from the social service (Kakao, Google, Naver, Facebook), email address, name or nickname, profile photo (if provided)',
              'Optional: date of birth, gender, interests, profile photo, introduction, whether you agree to marketing messages',
              'When using paid services: purchased item, amount, payment date and time, payment key and order number (card numbers and other payment details are handled by Toss Payments and not received by the Company)',
              'Information you upload: posts, summaries, discussions (including offline meetup places and online meetup links), comments, photos and attachments',
              'Generated automatically while you use the Service: IP address, access date and time, usage records, cookies',
            ],
          },
          'We also keep records of your agreements (what you agreed to, when, and the effective date of the terms).',
        ],
      },
      {
        heading: '3. Retention Periods',
        blocks: [
          {
            items: [
              'Member information: until you close your account. After closing, it is kept for [period] so the account can be restored, and then destroyed.',
              'Records of contracts or withdrawals, and of payments and supply of goods: 5 years (Act on Consumer Protection in Electronic Commerce)',
              'Records of consumer complaints or disputes: 3 years (Act on Consumer Protection in Electronic Commerce)',
              'Access records (such as login records): 3 months (Protection of Communications Secrets Act)',
            ],
          },
        ],
      },
      {
        heading: '4. Destruction',
        blocks: [
          'Personal information is destroyed without delay when its retention period ends or its purpose has been achieved. Electronic files are deleted so that they cannot be recovered, and paper documents are shredded or incinerated. Information that must be kept by law is stored separately from other information.',
        ],
      },
      {
        heading: '5. Provision to Third Parties',
        blocks: [
          'The Company does not provide personal information to third parties, except with your consent or where the law specifically requires it.',
          'Information members make public, such as posts, nickname, profile photo and introduction, can be seen by other users. Participants of a discussion can see its online meetup link.',
        ],
      },
      {
        heading: '6. Entrusted Processing',
        blocks: [
          'To provide the Service, the Company entrusts the following processing work.',
          {
            items: [
              'Toss Payments Co., Ltd.: payment processing',
              'Amazon Web Services, Inc.: storing photos and attachments [add server hosting if it is also entrusted]',
              'Google LLC: generating chatbot answers (Gemini API)',
            ],
          },
          'The Company sets out in its entrustment contracts what is needed to keep personal information safe, and supervises the entrusted parties.',
        ],
      },
      {
        heading: '7. Transfer Abroad',
        blocks: [
          'Personal information is transferred abroad as follows to generate chatbot answers.',
          {
            items: [
              'Recipient: Google LLC (contact: [contact])',
              'Country: United States',
              'When and how: sent over the network each time you use the chatbot',
              'Items: what you type into the chatbot and the conversation history',
              'Purpose: generating chatbot answers',
              'Retention: [period under the retention policy of Google]',
              'How to refuse: nothing is transferred if you do not use the chatbot. You can use every other part of the Service without it.',
            ],
          },
          '[If the file storage (AWS) region is outside Korea, describe it in the same format.]',
        ],
      },
      {
        heading: '8. Your Rights and How to Exercise Them',
        blocks: [
          {
            ordered: true,
            items: [
              'You may at any time ask to access, correct or delete your personal information, or to stop its processing.',
              'You can edit your nickname, profile photo and introduction in the Service, and close your account on the settings page. For other requests, write to [support email] and we will handle them without delay.',
              'You may also make requests through a legal representative or an authorized person.',
            ],
          },
        ],
      },
      {
        id: 'marketing',
        heading: '9. Marketing Messages (Optional)',
        blocks: [
          {
            items: [
              'Purpose: news about new features, events and recommended discussions',
              'Items: email address, nickname, interests',
              'Retention: until you withdraw your consent or close your account',
            ],
          },
          'You can use the whole Service without agreeing. You can withdraw your consent [how: e.g. on the settings page or by emailing customer support].',
        ],
      },
      {
        heading: '10. Children Under 14',
        blocks: [
          'Only people aged 14 or older can sign up, and the Company does not collect personal information from children under 14.',
        ],
      },
      {
        heading: '11. Cookies and Similar Technologies',
        blocks: [
          'The Company uses a cookie to keep you logged in, and browser storage to remember your language and save drafts. It does not use tracking tools for advertising or behavioral analysis.',
          'You can block cookies in your browser settings, but you may then not stay logged in.',
        ],
      },
      {
        heading: '12. Security Measures',
        blocks: [
          {
            items: [
              'Passwords are stored with one-way encryption (bcrypt) that cannot be reversed.',
              'Information exchanged with the Service is sent over an encrypted connection (HTTPS).',
              'Access to personal information is limited to the minimum number of people.',
              'Payment details are handled by the payment provider and not stored by the Company.',
            ],
          },
        ],
      },
      {
        heading: '13. Privacy Officer',
        blocks: [
          {
            items: [
              'Name: [Name]',
              'Title: [Title]',
              'Contact: [Email], [Phone]',
            ],
          },
        ],
      },
      {
        heading: '14. Remedies',
        blocks: [
          'For advice on or reports of privacy violations, you can contact the following Korean agencies.',
          {
            items: [
              'Personal Information Dispute Mediation Committee: 1833-6972 (www.kopico.go.kr)',
              'Privacy Infringement Report Center: 118 (privacy.kisa.or.kr)',
              "Supreme Prosecutors' Office: 1301 (www.spo.go.kr)",
              'Korean National Police Agency: 182 (ecrm.police.go.kr)',
            ],
          },
        ],
      },
      {
        heading: '15. Changes to This Policy',
        blocks: [
          'This Privacy Policy applies from [effective date]. If it changes, the Company announces this in the Service at least 7 days before the change takes effect.',
        ],
      },
    ],
  },
};

export default documents;
