export interface ExamChoice {
  id: string;
  label: string;
}

export interface ExamQuestion {
  id: string;
  prompt: string;
  area: string;
  choices: ExamChoice[];
  answer: string;
}

export interface RoleExam {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  focusAreas: string[];
  questions: ExamQuestion[];
}

export const ROLE_EXAMS: RoleExam[] = [
  {
    id: 'basic',
    title: 'Basic Test',
    subtitle: 'Lawyer · Public Defender · Prosecutor',
    description:
      'Measures readiness for courtroom advocacy across foundational doctrine, criminal practice, evidence, civil procedure, and remedies.',
    focusAreas: [
      'Foundations of law and hierarchy of authority',
      'Criminal law and procedure essentials',
      'Civil litigation workflow',
      'Core evidentiary rules',
      'Remedial strategy and sentencing basics'
    ],
    questions: [
      {
        id: 'basic-foundations-01',
        area: 'Foundations',
        prompt:
          'A state trial court confronting a conflict between a state statute and a city ordinance must apply which source under the Supremacy Clause hierarchy?',
        choices: [
          { id: 'a', label: 'The ordinance controls if the city council enacted it more recently.' },
          { id: 'b', label: 'The court must follow the state statute so long as it is validly enacted and within state power.' },
          { id: 'c', label: 'The court may choose either source based on equitable considerations.' },
          { id: 'd', label: 'The court must certify the question to the federal district court before acting.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-foundations-02',
        area: 'Foundations',
        prompt:
          'When briefing a new case for a supervising attorney, what is the first step you should take?',
        choices: [
          { id: 'a', label: 'Draft the argument heading that you expect to file.' },
          { id: 'b', label: 'Identify the procedural posture and question presented by the tribunal.' },
          { id: 'c', label: 'Collect every potentially relevant citation before reading the record.' },
          { id: 'd', label: 'Outline your anticipated closing argument to ensure theme consistency.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-foundations-03',
        area: 'Foundations',
        prompt:
          'Within the framework of vertical precedent, which tribunal is bound by a published opinion of the Second Circuit?',
        choices: [
          { id: 'a', label: 'A New York state appellate division court.' },
          { id: 'b', label: 'Any federal district court located within the Second Circuit.' },
          { id: 'c', label: 'All federal courts nationwide regardless of circuit.' },
          { id: 'd', label: 'Only the Supreme Court when reviewing Second Circuit cases.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-foundations-04',
        area: 'Foundations',
        prompt:
          'When triaging an intake interview, which objective comes last after building rapport and hearing an open narrative?',
        choices: [
          { id: 'a', label: 'Establish privilege by explaining confidentiality.' },
          { id: 'b', label: 'Identify outstanding deadlines, such as speedy trial or statute of limitations triggers.' },
          { id: 'c', label: 'Secure a written engagement letter.' },
          { id: 'd', label: 'Discuss fee arrangements for future billing.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-foundations-05',
        area: 'Foundations',
        prompt:
          'Which statement best reflects the hierarchy of interpretive sources applied in American courts?',
        choices: [
          { id: 'a', label: 'Agency guidance can displace statutes if the agency has subject-matter expertise.' },
          { id: 'b', label: 'Trial courts should start with persuasive authorities before examining binding precedent.' },
          { id: 'c', label: 'Valid federal statutes outrank conflicting state or local enactments within the statute’s domain.' },
          { id: 'd', label: 'Local ordinances always control municipal prosecutions even when state law is contrary.' }
        ],
        answer: 'c'
      },
      {
        id: 'basic-crimlaw-01',
        area: 'Criminal Law',
        prompt:
          'Criminal law requires a voluntary act. Which scenario satisfies that requirement?',
        choices: [
          { id: 'a', label: 'A defendant’s reflex causes them to strike an officer while seizing.' },
          { id: 'b', label: 'A driver who knowingly speeds through a school zone and hits a pedestrian.' },
          { id: 'c', label: 'A sleepwalker injures a roommate without waking.' },
          { id: 'd', label: 'An epileptic suffers an unexpected seizure while holding a knife.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-crimlaw-02',
        area: 'Criminal Law',
        prompt:
          'Under inchoate liability doctrine, what is the minimum mental state required to convict on attempt?',
        choices: [
          { id: 'a', label: 'Negligence toward the result.' },
          { id: 'b', label: 'Recklessness as to the attendant circumstances.' },
          { id: 'c', label: 'Specific intent to complete the target offense.' },
          { id: 'd', label: 'Strict liability once a substantial step is taken.' }
        ],
        answer: 'c'
      },
      {
        id: 'basic-crimlaw-03',
        area: 'Criminal Law',
        prompt:
          'In homicide doctrine, what distinguishes depraved-heart murder from manslaughter?',
        choices: [
          { id: 'a', label: 'The use of a deadly weapon.' },
          { id: 'b', label: 'The presence of an actual intent to kill.' },
          { id: 'c', label: 'Extreme recklessness that shows indifference to human life.' },
          { id: 'd', label: 'Whether the victim dies within a year and a day.' }
        ],
        answer: 'c'
      },
      {
        id: 'basic-crimlaw-04',
        area: 'Criminal Law',
        prompt:
          'Under the traditional rule for duress, which option accurately states the standard?',
        choices: [
          { id: 'a', label: 'It excuses any crime, including intentional homicide, if the threat is imminent.' },
          { id: 'b', label: 'It requires a reasonable belief in an imminent threat that a person of ordinary firmness could not resist.' },
          { id: 'c', label: 'It is unavailable if the defendant reasonably believed the threatener could not carry out the harm.' },
          { id: 'd', label: 'It converts a completed offense into an attempt.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-crimlaw-05',
        area: 'Criminal Law',
        prompt:
          'Classic larceny requires what element beyond taking property?',
        choices: [
          { id: 'a', label: 'Taking property from the person of another.' },
          { id: 'b', label: 'Carrying away the property with intent to permanently deprive.' },
          { id: 'c', label: 'Using force or intimidation to accomplish the taking.' },
          { id: 'd', label: 'Obtaining title through deceit.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-crimpro-01',
        area: 'Criminal Procedure',
        prompt:
          'During a custodial interrogation, officers must give Miranda warnings before questioning when?',
        choices: [
          { id: 'a', label: 'Whenever a suspect is asked any question relating to a criminal investigation.' },
          { id: 'b', label: 'Only after the suspect requests a lawyer.' },
          { id: 'c', label: 'When the suspect is both in custody and subject to interrogation.' },
          { id: 'd', label: 'Only when questioning occurs at a police station.' }
        ],
        answer: 'c'
      },
      {
        id: 'basic-crimpro-02',
        area: 'Criminal Procedure',
        prompt:
          'Under the exclusionary rule, what is the remedy for evidence obtained in violation of the Fourth Amendment absent a good-faith exception?',
        choices: [
          { id: 'a', label: 'Mandatory dismissal of the entire case.' },
          { id: 'b', label: 'Suppression of the illegally obtained evidence in the prosecution’s case-in-chief.' },
          { id: 'c', label: 'Monetary damages payable to the defendant.' },
          { id: 'd', label: 'Automatic reversal on appeal without regard to harmless error.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-crimpro-03',
        area: 'Criminal Procedure',
        prompt:
          'What deadline governs federal Speedy Trial Act readiness for trial?',
        choices: [
          { id: 'a', label: '30 days from indictment to trial unless the defendant waives it.' },
          { id: 'b', label: '70 days from indictment or first appearance, excluding permissible delays.' },
          { id: 'c', label: '120 days from arrest regardless of continuances.' },
          { id: 'd', label: 'No fixed deadline; courts apply a balancing test only.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-crimpro-04',
        area: 'Criminal Procedure',
        prompt:
          'During a Rule 11 colloquy, what must the judge verify before accepting a guilty plea?',
        choices: [
          { id: 'a', label: 'That the prosecution has disclosed all discovery.' },
          { id: 'b', label: 'That the plea is knowing, voluntary, and supported by a factual basis.' },
          { id: 'c', label: 'That the defendant has no pending civil cases related to the conduct.' },
          { id: 'd', label: 'That the victim approves of the plea agreement.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-crimpro-05',
        area: 'Criminal Procedure',
        prompt:
          'When deciding pretrial detention under the Bail Reform Act, what factor is paramount?',
        choices: [
          { id: 'a', label: 'The defendant’s ability to post monetary bond.' },
          { id: 'b', label: 'Whether release conditions can reasonably assure appearance and community safety.' },
          { id: 'c', label: 'The severity of media coverage about the offense.' },
          { id: 'd', label: 'The prosecution’s expressed preference for detention.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-civpro-01',
        area: 'Civil Procedure',
        prompt:
          'Which basis for personal jurisdiction satisfies due process without consent?',
        choices: [
          { id: 'a', label: 'Serving the defendant while they travel through the forum state.' },
          { id: 'b', label: 'Filing the complaint in the defendant’s home state only.' },
          { id: 'c', label: 'Obtaining a warrant for the defendant’s arrest.' },
          { id: 'd', label: 'Showing that the defendant once vacationed in the forum.' }
        ],
        answer: 'a'
      },
      {
        id: 'basic-civpro-02',
        area: 'Civil Procedure',
        prompt:
          'When may a defendant remove a civil case from state to federal court based on diversity jurisdiction?',
        choices: [
          { id: 'a', label: 'Anytime the amount in controversy exceeds $75,000 regardless of citizenship.' },
          { id: 'b', label: 'When complete diversity exists and no properly joined defendant is a citizen of the forum state.' },
          { id: 'c', label: 'Only with the plaintiff’s consent in writing.' },
          { id: 'd', label: 'Never if any party is an LLC or corporation.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-civpro-03',
        area: 'Civil Procedure',
        prompt:
          'The discovery roadmap highlights proportionality. Which factor is part of the Rule 26(b)(1) proportionality analysis?',
        choices: [
          { id: 'a', label: 'The number of interrogatories the plaintiff intends to serve.' },
          { id: 'b', label: 'Whether the burden of discovery outweighs its likely benefit considering the issues and resources.' },
          { id: 'c', label: 'The geographic distance between counsel.' },
          { id: 'd', label: 'The judge’s caseload.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-civpro-04',
        area: 'Civil Procedure',
        prompt:
          'Summary judgment is covered extensively. Which statement matches the standard?',
        choices: [
          { id: 'a', label: 'Granted when the moving party shows the opponent’s witnesses lack credibility.' },
          { id: 'b', label: 'Granted if there is no genuine dispute of material fact and the movant is entitled to judgment as a matter of law.' },
          { id: 'c', label: 'Denied whenever the nonmovant files any affidavit.' },
          { id: 'd', label: 'Granted only after a full evidentiary hearing.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-civpro-05',
        area: 'Civil Procedure',
        prompt:
          'What is the primary purpose of a motion in limine?',
        choices: [
          { id: 'a', label: 'To compel arbitration before trial begins.' },
          { id: 'b', label: 'To resolve disputed evidentiary issues before they are presented to the jury.' },
          { id: 'c', label: 'To seek sanctions for discovery misconduct.' },
          { id: 'd', label: 'To request judgment notwithstanding the verdict.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-evidence-01',
        area: 'Evidence',
        prompt:
          'What makes evidence admissible under Rules 401 and 402?',
        choices: [
          { id: 'a', label: 'It must conclusively prove a fact in dispute.' },
          { id: 'b', label: 'It must make a fact of consequence more or less probable than it would be without the evidence and not be barred by another rule.' },
          { id: 'c', label: 'It must be scientific or technical.' },
          { id: 'd', label: 'It must be authenticated by an expert witness.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-evidence-02',
        area: 'Evidence',
        prompt:
          'Which statement qualifies as a party-opponent admission under Rule 801(d)(2)?',
        choices: [
          { id: 'a', label: 'A bystander’s excited utterance describing the event.' },
          { id: 'b', label: 'A defendant’s own prior inconsistent statement offered by the prosecution.' },
          { id: 'c', label: 'A victim’s out-of-court accusation offered for its truth.' },
          { id: 'd', label: 'A witness’s prior consistent statement to rebut fabrication.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-evidence-03',
        area: 'Evidence',
        prompt:
          'Under Rule 609, which conviction is most readily admissible to attack credibility?',
        choices: [
          { id: 'a', label: 'A 12-year-old misdemeanor shoplifting conviction of a non-defendant witness.' },
          { id: 'b', label: 'A felony fraud conviction from three years ago involving deceit.' },
          { id: 'c', label: 'A juvenile adjudication for trespass.' },
          { id: 'd', label: 'An arrest without conviction.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-evidence-04',
        area: 'Evidence',
        prompt:
          'Before admitting expert testimony under Rule 702, what must the court find?',
        choices: [
          { id: 'a', label: 'The expert holds an advanced academic degree.' },
          { id: 'b', label: 'The testimony is based on sufficient facts or data, reliable principles, and will help the trier of fact.' },
          { id: 'c', label: 'The expert has previously testified for the same party.' },
          { id: 'd', label: 'The methodology is generally accepted by 100% of practitioners.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-evidence-05',
        area: 'Evidence',
        prompt:
          'When may a criminal defendant offer evidence of a pertinent character trait under the Rules of Evidence?',
        choices: [
          { id: 'a', label: 'Only during sentencing.' },
          { id: 'b', label: 'In the form of reputation or opinion testimony to show conduct in conformity, opening the door to rebuttal.' },
          { id: 'c', label: 'Only after the prosecution introduces specific instances first.' },
          { id: 'd', label: 'Never in federal court.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-remedies-01',
        area: 'Remedies',
        prompt:
          'Which factor is NOT part of the traditional four-part test for a preliminary injunction?',
        choices: [
          { id: 'a', label: 'Likelihood of success on the merits.' },
          { id: 'b', label: 'Irreparable harm absent relief.' },
          { id: 'c', label: 'Availability of punitive damages.' },
          { id: 'd', label: 'Balance of equities and public interest.' }
        ],
        answer: 'c'
      },
      {
        id: 'basic-remedies-02',
        area: 'Remedies',
        prompt:
          'Under the damages primer, what is the default measure for breach of contract?',
        choices: [
          { id: 'a', label: 'Expectation damages placing the plaintiff in the position as if the contract were performed.' },
          { id: 'b', label: 'Nominal damages unless bad faith is shown.' },
          { id: 'c', label: 'Restitution measured by defendant’s gain only.' },
          { id: 'd', label: 'Automatic specific performance of the contract.' }
        ],
        answer: 'a'
      },
      {
        id: 'basic-remedies-03',
        area: 'Remedies',
        prompt:
          'The sentencing overview highlights the federal guidelines. What is required before imposing an above-guideline sentence?',
        choices: [
          { id: 'a', label: 'A jury finding beyond a reasonable doubt.' },
          { id: 'b', label: 'Notice to the parties and an explanation addressing 18 U.S.C. § 3553(a) factors.' },
          { id: 'c', label: 'Approval from the sentencing commission.' },
          { id: 'd', label: 'Consent from the victim.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-remedies-04',
        area: 'Remedies',
        prompt:
          'When is equitable restitution (constructive trust) typically available?',
        choices: [
          { id: 'a', label: 'Whenever legal damages are quantifiable.' },
          { id: 'b', label: 'When specific property or its traceable proceeds are wrongfully held by the defendant.' },
          { id: 'c', label: 'Only in criminal cases.' },
          { id: 'd', label: 'Any time punitive damages are unavailable.' }
        ],
        answer: 'b'
      },
      {
        id: 'basic-remedies-05',
        area: 'Remedies',
        prompt:
          'Before a court imposes criminal contempt for violating an order, what must occur?',
        choices: [
          { id: 'a', label: 'An immediate jail sanction without hearing.' },
          { id: 'b', label: 'Notice and an opportunity to be heard with proof beyond a reasonable doubt.' },
          { id: 'c', label: 'A civil jury trial on the contempt charge.' },
          { id: 'd', label: 'Certification by the clerk of court.' }
        ],
        answer: 'b'
      }
    ]
  },
  {
    id: 'judge',
    title: 'Judge Test',
    subtitle: 'District Court Judge · Trial Law',
    description:
      'Evaluates case-management discipline, evidentiary gatekeeping, and trial oversight expected of a district court judge.',
    focusAreas: [
      'Active docket control and motion practice',
      'Civil procedure rulings and sanctions',
      'Criminal case supervision from arraignment through sentencing',
      'Evidence gatekeeping and courtroom management',
      'Jury stewardship and judicial ethics'
    ],
    questions: [
      {
        id: 'judge-management-01',
        area: 'Case Management',
        prompt:
          'Under Rule 16(b), scheduling orders must issue by when absent good cause for delay?',
        choices: [
          { id: 'a', label: 'Within 14 days after the complaint is filed.' },
          { id: 'b', label: 'Within the earlier of 90 days after any defendant is served or 60 days after any defendant appears.' },
          { id: 'c', label: 'Only after the first discovery dispute arises.' },
          { id: 'd', label: 'There is no timing requirement.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-management-02',
        area: 'Case Management',
        prompt:
          'A pro se litigant repeatedly files unintelligible motions. According to the chambers management guidance, what is the best practice before imposing filing restrictions?',
        choices: [
          { id: 'a', label: 'Summarily deny the motions without explanation.' },
          { id: 'b', label: 'Issue an order to show cause giving notice of the proposed restrictions and an opportunity to respond.' },
          { id: 'c', label: 'Refer the litigant to the disciplinary committee.' },
          { id: 'd', label: 'Instruct the clerk to reject future filings automatically.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-management-03',
        area: 'Case Management',
        prompt:
          'During the Rule 16 final pretrial conference, which topic must the judge be prepared to address?',
        choices: [
          { id: 'a', label: 'Potential plea offers in related criminal cases.' },
          { id: 'b', label: 'Admissibility of exhibits, witness lists, and trial time allocations.' },
          { id: 'c', label: 'Bar association dues compliance for each attorney.' },
          { id: 'd', label: 'Drafting a settlement demand on behalf of the plaintiff.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-management-04',
        area: 'Case Management',
        prompt:
          'When may a judge limit discovery under Rule 26(b)(2)(C)?',
        choices: [
          { id: 'a', label: 'Only if the requesting party has exceeded a numerical limit.' },
          { id: 'b', label: 'Whenever the discovery sought is unreasonably cumulative, duplicative, or the burden outweighs the benefit.' },
          { id: 'c', label: 'Automatically once expert discovery begins.' },
          { id: 'd', label: 'Only after trial has started.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-management-05',
        area: 'Case Management',
        prompt:
          'Before granting ex parte temporary relief, what should chambers confirm?',
        choices: [
          { id: 'a', label: 'That the movant has provided specific notice of the application or explained why notice cannot be given.' },
          { id: 'b', label: 'That the movant paid the expedited filing fee.' },
          { id: 'c', label: 'That the opposing party has submitted a responsive brief.' },
          { id: 'd', label: 'That the parties have engaged in mediation.' }
        ],
        answer: 'a'
      },
      {
        id: 'judge-civpro-01',
        area: 'Civil Procedure',
        prompt:
          'Before certifying any class under Rule 23, which requirement must be met?',
        choices: [
          { id: 'a', label: 'At least one named plaintiff must prove the merits.' },
          { id: 'b', label: 'The class must be so numerous that joinder is impracticable, there must be commonality, typicality, and adequacy.' },
          { id: 'c', label: 'Every class member must receive actual notice.' },
          { id: 'd', label: 'The case must involve monetary damages.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-civpro-02',
        area: 'Civil Procedure',
        prompt:
          'Under Rule 37 sanctions, what is the threshold for issuing issue-preclusion sanctions?',
        choices: [
          { id: 'a', label: 'A finding of bad faith is always required.' },
          { id: 'b', label: 'The failure must be willful or in bad faith, or the opposing party must suffer substantial prejudice where lesser sanctions would be ineffective.' },
          { id: 'c', label: 'Any negligent failure to produce documents.' },
          { id: 'd', label: 'Only repeated violations after three warnings.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-civpro-03',
        area: 'Civil Procedure',
        prompt:
          'When ruling on summary judgment under Rule 56, what view of the evidence must the judge adopt?',
        choices: [
          { id: 'a', label: 'The judge weighs credibility to decide which side should prevail.' },
          { id: 'b', label: 'All reasonable inferences must be drawn in favor of the non-moving party.' },
          { id: 'c', label: 'The moving party’s affidavits are accepted as true unless contradicted.' },
          { id: 'd', label: 'The judge may disregard the record and rely on pleadings.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-civpro-04',
        area: 'Civil Procedure',
        prompt:
          'Before entering default judgment against a party who appeared, the court must:',
        choices: [
          { id: 'a', label: 'Grant judgment automatically upon request.' },
          { id: 'b', label: 'Provide written notice of the motion at least 7 days before the hearing.' },
          { id: 'c', label: 'Refer the matter to a magistrate judge.' },
          { id: 'd', label: 'Order the party to obtain counsel.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-civpro-05',
        area: 'Civil Procedure',
        prompt:
          'When may a judge waive the Rule 65(c) security requirement for a preliminary injunction?',
        choices: [
          { id: 'a', label: 'Whenever the movant is the government or an indigent individual and equity favors relief.' },
          { id: 'b', label: 'Never; the rule is jurisdictional.' },
          { id: 'c', label: 'Only if the opposing party consents.' },
          { id: 'd', label: 'Only when the case involves intellectual property.' }
        ],
        answer: 'a'
      },
      {
        id: 'judge-crimpro-01',
        area: 'Criminal Procedure',
        prompt:
          'During an initial appearance outlined in the criminal procedure timeline, what must the judge advise the defendant?',
        choices: [
          { id: 'a', label: 'The likely sentencing range if convicted.' },
          { id: 'b', label: 'The charges, the right to counsel, and the right to remain silent.' },
          { id: 'c', label: 'That they must testify at preliminary hearing.' },
          { id: 'd', label: 'That plea negotiations are mandatory.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-crimpro-02',
        area: 'Criminal Procedure',
        prompt:
          'When a defendant moves for a Franks hearing, what must the defense show to obtain the hearing?',
        choices: [
          { id: 'a', label: 'Any inconsistency between the affidavit and testimony.' },
          { id: 'b', label: 'A substantial preliminary showing that the affiant intentionally or recklessly included a false statement necessary to probable cause.' },
          { id: 'c', label: 'That the warrant lacked particularity.' },
          { id: 'd', label: 'That the defendant was innocent.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-crimpro-03',
        area: 'Criminal Procedure',
        prompt:
          'For an ends-of-justice continuance under the Speedy Trial Act, what finding must the court make on the record?',
        choices: [
          { id: 'a', label: 'That the continuance serves judicial economy regardless of prejudice.' },
          { id: 'b', label: 'That the ends of justice outweigh the best interests of the public and the defendant in a speedy trial.' },
          { id: 'c', label: 'That the defendant consents in writing.' },
          { id: 'd', label: 'That the prosecutor requested the continuance.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-crimpro-04',
        area: 'Criminal Procedure',
        prompt:
          'Before accepting a felony guilty plea under Rule 11, the judge must establish what regarding the factual basis?',
        choices: [
          { id: 'a', label: 'That the defendant admits every element in their own words.' },
          { id: 'b', label: 'That there is sufficient evidence from the record to support each essential element of the offense.' },
          { id: 'c', label: 'That the victim has testified.' },
          { id: 'd', label: 'That sentencing guidelines will not exceed five years.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-crimpro-05',
        area: 'Criminal Procedure',
        prompt:
          'Which factor is NOT one of the Bail Reform Act considerations the judge must weigh when setting release conditions?',
        choices: [
          { id: 'a', label: 'Nature and circumstances of the offense.' },
          { id: 'b', label: 'Weight of the evidence.' },
          { id: 'c', label: 'History and characteristics of the person.' },
          { id: 'd', label: 'The defendant’s political party affiliation.' }
        ],
        answer: 'd'
      },
      {
        id: 'judge-evidence-01',
        area: 'Evidence',
        prompt:
          'When excluding evidence under Rule 403, what must the judge articulate?',
        choices: [
          { id: 'a', label: 'That the evidence is irrelevant.' },
          { id: 'b', label: 'That the probative value is substantially outweighed by a listed danger such as unfair prejudice or confusion.' },
          { id: 'c', label: 'That the jury will likely acquit without the evidence.' },
          { id: 'd', label: 'That the proponent acted in bad faith.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-evidence-02',
        area: 'Evidence',
        prompt:
          'According to the hearsay practice guides, before admitting a business record the judge must find:',
        choices: [
          { id: 'a', label: 'The custodian personally prepared the record.' },
          { id: 'b', label: 'The record was made at or near the time by someone with knowledge, kept in the course of regularly conducted activity, and making it was a regular practice.' },
          { id: 'c', label: 'The record was notarized.' },
          { id: 'd', label: 'The opposing party agrees it is trustworthy.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-evidence-03',
        area: 'Evidence',
        prompt:
          'Which factor is part of the Daubert reliability inquiry for expert testimony?',
        choices: [
          { id: 'a', label: 'Whether the expert has ever testified before.' },
          { id: 'b', label: 'Whether the theory has been tested, peer reviewed, has a known error rate, and enjoys general acceptance.' },
          { id: 'c', label: 'Whether the expert is a former prosecutor.' },
          { id: 'd', label: 'Whether the jurors request the testimony.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-evidence-04',
        area: 'Evidence',
        prompt:
          'Under Rule 611, what authority does the judge have over witness interrogation?',
        choices: [
          { id: 'a', label: 'None; counsel control questioning.' },
          { id: 'b', label: 'The judge may exercise reasonable control to make procedures effective for truth, avoid wasting time, and protect witnesses from harassment.' },
          { id: 'c', label: 'The judge may only intervene after objections.' },
          { id: 'd', label: 'The judge may dictate the substance of questions.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-evidence-05',
        area: 'Evidence',
        prompt:
          'Before admitting other-act evidence against a criminal defendant under Rule 404(b), what must the government do?',
        choices: [
          { id: 'a', label: 'Prove the prior act beyond a reasonable doubt before trial.' },
          { id: 'b', label: 'Provide reasonable notice in advance of trial or during trial for good cause and articulate a non-propensity purpose.' },
          { id: 'c', label: 'Obtain written consent from the defendant.' },
          { id: 'd', label: 'Present live testimony from the prior victim at the pretrial conference.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-jury-01',
        area: 'Jury Management',
        prompt:
          'During voir dire, when must a judge grant a for-cause challenge?',
        choices: [
          { id: 'a', label: 'Whenever counsel believes the juror is biased.' },
          { id: 'b', label: 'When the juror’s answers show actual bias or inability to follow the law despite rehabilitation.' },
          { id: 'c', label: 'Whenever the juror knows a party, regardless of the relationship.' },
          { id: 'd', label: 'Only after all peremptory challenges are exhausted.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-jury-02',
        area: 'Jury Management',
        prompt:
          'When should the judge provide draft instructions to counsel?',
        choices: [
          { id: 'a', label: 'Only after the jury begins deliberating.' },
          { id: 'b', label: 'Before closing arguments to allow objections on the record.' },
          { id: 'c', label: 'Never; instructions are secret until delivered.' },
          { id: 'd', label: 'Only if the parties jointly request them.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-jury-03',
        area: 'Jury Management',
        prompt:
          'According to the juror communications protocol, how should the court respond when the jury sends a written question during deliberations?',
        choices: [
          { id: 'a', label: 'Have the law clerk answer privately.' },
          { id: 'b', label: 'Confer with counsel on the record and respond in open court or by written note filed on the docket.' },
          { id: 'c', label: 'Ignore the note to avoid influencing deliberations.' },
          { id: 'd', label: 'Speak directly with the foreperson in chambers.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-jury-04',
        area: 'Jury Management',
        prompt:
          'If a juror reports outside contact about the case, the judge must first:',
        choices: [
          { id: 'a', label: 'Declare a mistrial immediately.' },
          { id: 'b', label: 'Conduct a focused inquiry to determine the nature of the contact and whether prejudice can be cured.' },
          { id: 'c', label: 'Replace the juror without questioning.' },
          { id: 'd', label: 'Instruct counsel to handle it after verdict.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-jury-05',
        area: 'Jury Management',
        prompt:
          'When requested after a verdict, what is the purpose of polling the jury?',
        choices: [
          { id: 'a', label: 'To allow jurors to explain their reasoning.' },
          { id: 'b', label: 'To ensure each juror individually assents to the verdict before it is recorded.' },
          { id: 'c', label: 'To gather feedback for future trials.' },
          { id: 'd', label: 'To determine damages.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-ethics-01',
        area: 'Judicial Ethics',
        prompt:
          'Under 28 U.S.C. § 455, when must a district judge disqualify themselves?',
        choices: [
          { id: 'a', label: 'Whenever a party files a motion, regardless of grounds.' },
          { id: 'b', label: 'When their impartiality might reasonably be questioned, including when they have a financial interest in the subject matter.' },
          { id: 'c', label: 'Only when actual bias is proven.' },
          { id: 'd', label: 'Whenever a former colleague appears before the court.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-ethics-02',
        area: 'Judicial Ethics',
        prompt:
          'Which ex parte communication is permitted under chambers ethics rules?',
        choices: [
          { id: 'a', label: 'Discussing the merits with one party about a pending motion.' },
          { id: 'b', label: 'Administrative scheduling matters that do not address substantive issues, provided the other parties are promptly notified.' },
          { id: 'c', label: 'Receiving legal research from a friend who is not counsel of record.' },
          { id: 'd', label: 'Accepting a summary judgment draft from defense counsel.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-ethics-03',
        area: 'Judicial Ethics',
        prompt:
          'According to the Code of Conduct overview, may a judge publicly comment on a pending case?',
        choices: [
          { id: 'a', label: 'Yes, if the comment is accurate.' },
          { id: 'b', label: 'Yes, if the comment is on social media.' },
          { id: 'c', label: 'No, judges must avoid public comment that might affect the outcome or fairness of a pending or impending matter.' },
          { id: 'd', label: 'Only if the case involves a public official.' }
        ],
        answer: 'c'
      },
      {
        id: 'judge-ethics-04',
        area: 'Judicial Ethics',
        prompt:
          'Which of the following gifts may a judge accept without reporting?',
        choices: [
          { id: 'a', label: 'A cash honorarium for speaking about a pending case.' },
          { id: 'b', label: 'Ordinary social hospitality such as a modest dinner invitation from a longtime friend with no business before the court.' },
          { id: 'c', label: 'Season tickets from a local law firm.' },
          { id: 'd', label: 'Stock options from a litigant as a thank-you.' }
        ],
        answer: 'b'
      },
      {
        id: 'judge-ethics-05',
        area: 'Judicial Ethics',
        prompt:
          'When must a judge refer an attorney to disciplinary authorities for misconduct?',
        choices: [
          { id: 'a', label: 'Only after a criminal conviction.' },
          { id: 'b', label: 'When the judge learns of conduct raising a substantial question about the lawyer’s honesty, trustworthiness, or fitness.' },
          { id: 'c', label: 'Whenever an attorney loses a motion.' },
          { id: 'd', label: 'If the attorney seeks a continuance.' }
        ],
        answer: 'b'
      }
    ]
  },
  {
    id: 'justice',
    title: 'Justice Test',
    subtitle: 'Supreme Court Justice · Appellate Law',
    description:
      'Challenges mastery of Supreme Court jurisdiction, constitutional analysis, and opinion crafting expected of a Justice.',
    focusAreas: [
      'Supreme Court jurisdiction and justiciability doctrines',
      'Appellate standards of review and record-based adjudication',
      'Advanced constitutional law and separation of powers',
      'Opinion drafting, coalition building, and stare decisis',
      'Oral argument strategy and conference procedures'
    ],
    questions: [
      {
        id: 'justice-jurisdiction-01',
        area: 'Jurisdiction',
        prompt:
          'Under 28 U.S.C. § 1257, when may the Supreme Court review a state-court judgment?',
        choices: [
          { id: 'a', label: 'Whenever the Court believes the issue is important, regardless of federal law.' },
          { id: 'b', label: 'When the highest state court renders a final judgment that turns on a federal question and the losing party raises that issue.' },
          { id: 'c', label: 'Only when the Solicitor General consents.' },
          { id: 'd', label: 'Never; the Court lacks jurisdiction over state cases.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-jurisdiction-02',
        area: 'Jurisdiction',
        prompt:
          'Which scenario fails the Article III standing requirements?',
        choices: [
          { id: 'a', label: 'A plaintiff challenging a regulation that presently increases compliance costs.' },
          { id: 'b', label: 'A taxpayer alleging only generalized grievances about government spending.' },
          { id: 'c', label: 'A business contesting a license revocation affecting its operations.' },
          { id: 'd', label: 'A criminal defendant appealing a conviction.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-jurisdiction-03',
        area: 'Jurisdiction',
        prompt:
          'Which scenario fits the capable-of-repetition-yet-evading-review exception to mootness?',
        choices: [
          { id: 'a', label: 'An election dispute that will recur with the same parties every four years.' },
          { id: 'b', label: 'A challenge to a short-term injunction likely to expire before review but prone to recurrence for the same party.' },
          { id: 'c', label: 'A damages action resolved by settlement.' },
          { id: 'd', label: 'A contract case dismissed for lack of jurisdiction.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-jurisdiction-04',
        area: 'Jurisdiction',
        prompt:
          'Under the final judgment rule, what is generally required before the Court grants certiorari?',
        choices: [
          { id: 'a', label: 'A live controversy with no adequate and independent state-law ground supporting the result.' },
          { id: 'b', label: 'Certification from at least two circuit courts.' },
          { id: 'c', label: 'A joint application from both parties.' },
          { id: 'd', label: 'Proof that the petitioner requested en banc review.' }
        ],
        answer: 'a'
      },
      {
        id: 'justice-jurisdiction-05',
        area: 'Jurisdiction',
        prompt:
          'Which controversy falls within the Supreme Court’s mandatory original jurisdiction?',
        choices: [
          { id: 'a', label: 'A habeas petition filed by a federal prisoner.' },
          { id: 'b', label: 'A boundary dispute between two states.' },
          { id: 'c', label: 'A patent appeal from the Federal Circuit.' },
          { id: 'd', label: 'Any case in which a Cabinet secretary is a party.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-appellate-01',
        area: 'Appellate Procedure',
        prompt:
          'Under Supreme Court Rule 10, which factor most strongly supports review?',
        choices: [
          { id: 'a', label: 'A petitioner asserting that the lower court misapplied the facts.' },
          { id: 'b', label: 'A clear split between federal circuits on an important federal question.' },
          { id: 'c', label: 'A unanimous court of appeals decision.' },
          { id: 'd', label: 'A case with no preserved federal issue.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-appellate-02',
        area: 'Appellate Procedure',
        prompt:
          'How should a Justice treat new evidence first presented in a merits brief?',
        choices: [
          { id: 'a', label: 'Consider it if it seems reliable.' },
          { id: 'b', label: 'Decline to consider it because Supreme Court review is confined to the record below.' },
          { id: 'c', label: 'Remand automatically for fact-finding.' },
          { id: 'd', label: 'Order supplemental briefing on admissibility.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-appellate-03',
        area: 'Appellate Procedure',
        prompt:
          'Why is it risky to expand the question presented in the merits brief?',
        choices: [
          { id: 'a', label: 'Because the Court treats the question presented as jurisdictional and may decline to consider new issues.' },
          { id: 'b', label: 'Because the Court prefers petitioners to add new issues later.' },
          { id: 'c', label: 'Because the respondent can file a new cert petition.' },
          { id: 'd', label: 'Because the Chief Justice must approve any change.' }
        ],
        answer: 'a'
      },
      {
        id: 'justice-appellate-04',
        area: 'Appellate Procedure',
        prompt:
          'In emergency stay applications, which factor assesses the likelihood that the Court will grant certiorari and reverse?',
        choices: [
          { id: 'a', label: 'Irreparable injury absent a stay.' },
          { id: 'b', label: 'Balance of equities.' },
          { id: 'c', label: 'Probability of success on the merits.' },
          { id: 'd', label: 'Public interest.' }
        ],
        answer: 'c'
      },
      {
        id: 'justice-appellate-05',
        area: 'Appellate Procedure',
        prompt:
          'When resolving a summary reversal recommendation from the cert pool, what must a Justice confirm?',
        choices: [
          { id: 'a', label: 'That the case presents egregious error, clear controlling precedent, and no vehicle problems.' },
          { id: 'b', label: 'That the circuit split is entrenched.' },
          { id: 'c', label: 'That the Solicitor General supports reversal.' },
          { id: 'd', label: 'That oral argument would add substantial value.' }
        ],
        answer: 'a'
      },
      {
        id: 'justice-standard-01',
        area: 'Standards of Review',
        prompt:
          'The standards of review primer distinguishes de novo review. Which issue receives de novo review on appeal?',
        choices: [
          { id: 'a', label: 'A district court’s factual findings after a bench trial.' },
          { id: 'b', label: 'A pure question of law such as statutory interpretation preserved below.' },
          { id: 'c', label: 'A trial court’s evidentiary rulings.' },
          { id: 'd', label: 'A jury’s damages award.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-standard-02',
        area: 'Standards of Review',
        prompt:
          'When is constitutional error considered harmless?',
        choices: [
          { id: 'a', label: 'When the government proves beyond a reasonable doubt that the error did not contribute to the verdict.' },
          { id: 'b', label: 'Whenever the evidence of guilt is strong.' },
          { id: 'c', label: 'Whenever the defendant failed to object.' },
          { id: 'd', label: 'When the trial judge apologizes.' }
        ],
        answer: 'a'
      },
      {
        id: 'justice-standard-03',
        area: 'Standards of Review',
        prompt:
          'When reviewing for abuse of discretion at sentencing, what must a Justice examine?',
        choices: [
          { id: 'a', label: 'Whether the judge personally disagreed with the sentence.' },
          { id: 'b', label: 'Whether the district court considered the § 3553(a) factors and explained the variance with reasoned justifications.' },
          { id: 'c', label: 'Whether the defendant expresses remorse.' },
          { id: 'd', label: 'Whether the probation office recommended a different sentence.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-standard-04',
        area: 'Standards of Review',
        prompt:
          'What are the four prongs for relief under Federal Rule of Criminal Procedure 52(b)?',
        choices: [
          { id: 'a', label: 'Error, plainness, effect on substantial rights, and a serious effect on the fairness, integrity, or public reputation of judicial proceedings.' },
          { id: 'b', label: 'Error, prejudice, intent, and exhaustion.' },
          { id: 'c', label: 'Jurisdiction, merits, remedy, and mandate.' },
          { id: 'd', label: 'Cause, prejudice, and innocence.' }
        ],
        answer: 'a'
      },
      {
        id: 'justice-standard-05',
        area: 'Standards of Review',
        prompt:
          'Under Chevron step one, the Court asks whether:',
        choices: [
          { id: 'a', label: 'The agency’s interpretation is reasonable.' },
          { id: 'b', label: 'Congress has directly spoken to the precise question at issue using traditional tools of statutory construction.' },
          { id: 'c', label: 'The agency is politically accountable.' },
          { id: 'd', label: 'The regulated parties support the rule.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-constitutional-01',
        area: 'Constitutional Law',
        prompt:
          'Under the Youngstown framework’s Category Two, presidential power is:',
        choices: [
          { id: 'a', label: 'At its maximum when Congress has authorized the action.' },
          { id: 'b', label: 'In a zone of twilight where Congress has not spoken, requiring scrutiny of imperatives of events and contemporary imponderables.' },
          { id: 'c', label: 'At its lowest ebb when Congress has prohibited the action.' },
          { id: 'd', label: 'Unlimited if the President cites national security.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-constitutional-02',
        area: 'Constitutional Law',
        prompt:
          'What level of scrutiny applies to state laws that classify on the basis of gender?',
        choices: [
          { id: 'a', label: 'Rational basis review.' },
          { id: 'b', label: 'Intermediate scrutiny requiring an exceedingly persuasive justification.' },
          { id: 'c', label: 'Strict scrutiny.' },
          { id: 'd', label: 'Per se invalidity.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-constitutional-03',
        area: 'Constitutional Law',
        prompt:
          'Which statement is accurate for a traditional public forum under First Amendment doctrine?',
        choices: [
          { id: 'a', label: 'Content-based restrictions must satisfy strict scrutiny.' },
          { id: 'b', label: 'The government may impose content-based restrictions with rational basis review.' },
          { id: 'c', label: 'The government may close the forum to all expressive activity without justification.' },
          { id: 'd', label: 'Reasonable time, place, and manner restrictions must be viewpoint-based.' }
        ],
        answer: 'a'
      },
      {
        id: 'justice-constitutional-04',
        area: 'Constitutional Law',
        prompt:
          'Which right has the Court recognized as fundamental under the modern substantive due process framework?',
        choices: [
          { id: 'a', label: 'The right to government employment.' },
          { id: 'b', label: 'The right of parents to direct the upbringing of their children.' },
          { id: 'c', label: 'The right to subsidies for housing.' },
          { id: 'd', label: 'The right to gamble.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-constitutional-05',
        area: 'Constitutional Law',
        prompt:
          'What test governs whether Congress may use its Commerce Clause power to regulate intrastate activity?',
        choices: [
          { id: 'a', label: 'Whether the activity is purely local.' },
          { id: 'b', label: 'Whether the activity, taken in the aggregate, substantially affects interstate commerce.' },
          { id: 'c', label: 'Whether the states consent.' },
          { id: 'd', label: 'Whether the President approves.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-institutional-01',
        area: 'Institutional Practice',
        prompt:
          'What is one advantage of participating in the cert pool?',
        choices: [
          { id: 'a', label: 'Guaranteeing that your chambers controls every grant.' },
          { id: 'b', label: 'Sharing workload among chambers to avoid duplicative screening while still allowing independent review.' },
          { id: 'c', label: 'Avoiding the need to read briefs.' },
          { id: 'd', label: 'Obtaining extra argument time.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-institutional-02',
        area: 'Institutional Practice',
        prompt:
          'What is the primary goal of questioning from the bench during oral argument?',
        choices: [
          { id: 'a', label: 'To impress the gallery with rhetorical flourishes.' },
          { id: 'b', label: 'To test the consequences of each side’s rule and clarify weak points in the record or doctrine.' },
          { id: 'c', label: 'To restate your own views without engaging counsel.' },
          { id: 'd', label: 'To solicit settlement proposals.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-institutional-03',
        area: 'Institutional Practice',
        prompt:
          'Why is the vote order at Supreme Court conference significant?',
        choices: [
          { id: 'a', label: 'It allows the Chief to set the discussion tone while ensuring the most junior Justice votes before influence from seniors.' },
          { id: 'b', label: 'It permits cross-examination of each Justice.' },
          { id: 'c', label: 'It lets the Solicitor General participate.' },
          { id: 'd', label: 'It determines seniority for opinion assignment.' }
        ],
        answer: 'a'
      },
      {
        id: 'justice-institutional-04',
        area: 'Institutional Practice',
        prompt:
          'When the Chief Justice is in the majority and assigns the opinion, what consideration often guides the assignment?',
        choices: [
          { id: 'a', label: 'Punishing dissenters by assigning them long opinions.' },
          { id: 'b', label: 'Strategically balancing workload and ensuring a Justice who can hold the majority writes the opinion.' },
          { id: 'c', label: 'Rotating strictly by seniority.' },
          { id: 'd', label: 'Giving every case to the most junior Justice.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-institutional-05',
        area: 'Institutional Practice',
        prompt:
          'What is a key criticism the Court must guard against when handling shadow docket matters?',
        choices: [
          { id: 'a', label: 'Deciding cases through full briefing and argument.' },
          { id: 'b', label: 'Resolving major disputes without transparency or reasoned explanations, which can erode legitimacy.' },
          { id: 'c', label: 'Allowing amicus participation.' },
          { id: 'd', label: 'Publishing per curiam opinions.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-opinion-01',
        area: 'Opinion Crafting',
        prompt:
          'What should a majority opinion articulate to guide lower courts?',
        choices: [
          { id: 'a', label: 'Only the specific facts without broader reasoning.' },
          { id: 'b', label: 'A workable rule or standard tied to the holdings with reasoning that lower courts can apply.' },
          { id: 'c', label: 'Political commentary explaining the Justice’s philosophy.' },
          { id: 'd', label: 'A summary of oral argument banter.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-opinion-02',
        area: 'Opinion Crafting',
        prompt:
          'Why might a Justice write separately even when joining the judgment?',
        choices: [
          { id: 'a', label: 'To express a different rationale or highlight limitations that future courts should observe.' },
          { id: 'b', label: 'To increase the page count for publication bonuses.' },
          { id: 'c', label: 'Because majority opinions cannot exceed ten pages.' },
          { id: 'd', label: 'To prevent the judgment from taking effect.' }
        ],
        answer: 'a'
      },
      {
        id: 'justice-opinion-03',
        area: 'Opinion Crafting',
        prompt:
          'Which factor weighs against overruling precedent under the Court’s stare decisis considerations?',
        choices: [
          { id: 'a', label: 'Reliance interests that would be upset by change.' },
          { id: 'b', label: 'A better policy outcome under current preferences.' },
          { id: 'c', label: 'Disagreement with the original reasoning.' },
          { id: 'd', label: 'A change in Court membership.' }
        ],
        answer: 'a'
      },
      {
        id: 'justice-opinion-04',
        area: 'Opinion Crafting',
        prompt:
          'When vacating and remanding for further proceedings, what should the Court do to ensure clarity?',
        choices: [
          { id: 'a', label: 'Simply say “remanded” without guidance.' },
          { id: 'b', label: 'Explain the legal error and specify the issues the lower court must address on remand.' },
          { id: 'c', label: 'Direct the outcome desired.' },
          { id: 'd', label: 'Retain jurisdiction for supervisory decrees automatically.' }
        ],
        answer: 'b'
      },
      {
        id: 'justice-opinion-05',
        area: 'Opinion Crafting',
        prompt:
          'What practice helps maintain majority cohesion during draft circulation?',
        choices: [
          { id: 'a', label: 'Limiting circulation to the final draft only.' },
          { id: 'b', label: 'Inviting feedback early and revising to address legitimate concerns without surrendering the core holding.' },
          { id: 'c', label: 'Ignoring suggested edits from colleagues.' },
          { id: 'd', label: 'Announcing final votes before drafts circulate.' }
        ],
        answer: 'b'
      }
    ]
  },
  {
    id: 'all-purpose',
    title: 'All Purpose Test',
    subtitle: 'Integrated Multi-Role Assessment',
    description:
      'Blends doctrine, procedure, and strategy from across the program to benchmark comprehensive readiness for any legal role.',
    focusAreas: [
      'Foundational legal analysis and professional skills',
      'Criminal doctrine and procedural safeguards',
      'Civil litigation strategy and case sequencing',
      'Evidence, constitutional law, and appellate practice',
      'Remedies, negotiation, and cross-role coordination'
    ],
    questions: [
      {
        id: 'all-foundations-01',
        area: 'Foundations',
        prompt:
          'When synthesizing precedent for a memo, which approach should you use?',
        choices: [
          { id: 'a', label: 'List every case in chronological order without analysis.' },
          { id: 'b', label: 'Group authorities by doctrinal factors, explain the governing rule, then analogize or distinguish the facts.' },
          { id: 'c', label: 'Quote long passages from each opinion verbatim.' },
          { id: 'd', label: 'Focus on dissents to anticipate counterarguments only.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-foundations-02',
        area: 'Foundations',
        prompt:
          'If a trial-level decision conflicts with controlling circuit precedent, what should you do?',
        choices: [
          { id: 'a', label: 'Follow the trial decision if it is more persuasive.' },
          { id: 'b', label: 'Follow the circuit precedent because it is binding on the trial court.' },
          { id: 'c', label: 'Cite both but argue the trial decision should control.' },
          { id: 'd', label: 'Ignore both decisions and cite secondary sources.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-foundations-03',
        area: 'Foundations',
        prompt:
          'After an open narrative in an interview, which questioning technique should follow?',
        choices: [
          { id: 'a', label: 'Immediately confront the client with contradictions.' },
          { id: 'b', label: 'Use funneling questions moving from broad to narrow to fill factual gaps.' },
          { id: 'c', label: 'Avoid asking about timelines to preserve privilege.' },
          { id: 'd', label: 'Switch to yes/no questions only.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-foundations-04',
        area: 'Foundations',
        prompt:
          'When triaging a new matter, what factor determines whether to delegate a task to an investigator or paralegal?',
        choices: [
          { id: 'a', label: 'Whether the attorney dislikes the task.' },
          { id: 'b', label: 'Whether the task requires legal judgment or can be handled by support staff under supervision.' },
          { id: 'c', label: 'Whether the client demands personal attention.' },
          { id: 'd', label: 'Whether the statute of limitations has expired.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-crimlaw-01',
        area: 'Criminal Law',
        prompt:
          'Under accomplice liability, an accomplice is liable for which crimes?',
        choices: [
          { id: 'a', label: 'Only the precise crime they intended to facilitate.' },
          { id: 'b', label: 'The target offense and any foreseeable crimes committed in furtherance.' },
          { id: 'c', label: 'No crimes unless they were physically present.' },
          { id: 'd', label: 'All crimes committed by any co-defendant regardless of foreseeability.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-crimlaw-02',
        area: 'Criminal Law',
        prompt:
          'Embezzlement differs from larceny because it requires:',
        choices: [
          { id: 'a', label: 'Trespassory taking from the victim’s person.' },
          { id: 'b', label: 'Lawful possession converted with intent to defraud.' },
          { id: 'c', label: 'Use of force or intimidation.' },
          { id: 'd', label: 'Threats of future harm.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-crimlaw-03',
        area: 'Criminal Law',
        prompt:
          'Self-defense requires what proportionality showing?',
        choices: [
          { id: 'a', label: 'Deadly force may be used whenever the defendant feels threatened.' },
          { id: 'b', label: 'Force must be proportional to the threat, and deadly force is justified only against imminent deadly or serious bodily harm.' },
          { id: 'c', label: 'Any response is justified if the defendant is on their own property.' },
          { id: 'd', label: 'Deadly force is prohibited even if the defendant faces deadly harm.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-crimlaw-04',
        area: 'Criminal Law',
        prompt:
          'The mens rea overview distinguishes recklessness from negligence. Recklessness requires that the defendant:',
        choices: [
          { id: 'a', label: 'Fails to perceive a substantial risk.' },
          { id: 'b', label: 'Consciously disregards a substantial and unjustifiable risk.' },
          { id: 'c', label: 'Acts with purpose to cause a result.' },
          { id: 'd', label: 'Acts without any mental state.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-crimpro-01',
        area: 'Criminal Procedure',
        prompt:
          'A Terry stop requires which level of suspicion?',
        choices: [
          { id: 'a', label: 'Probable cause.' },
          { id: 'b', label: 'Reasonable suspicion that criminal activity is afoot.' },
          { id: 'c', label: 'A preponderance of the evidence.' },
          { id: 'd', label: 'Clear and convincing evidence.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-crimpro-02',
        area: 'Criminal Procedure',
        prompt:
          'What is the standard for returning a federal indictment?',
        choices: [
          { id: 'a', label: 'Beyond a reasonable doubt.' },
          { id: 'b', label: 'Probable cause to believe the accused committed the offense.' },
          { id: 'c', label: 'Clear and convincing evidence.' },
          { id: 'd', label: 'Preponderance of the evidence.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-crimpro-03',
        area: 'Criminal Procedure',
        prompt:
          'Testimonial hearsay may be admitted against a criminal defendant only if:',
        choices: [
          { id: 'a', label: 'The declarant is unavailable and the defendant had a prior opportunity to cross-examine.' },
          { id: 'b', label: 'The statement was given to police during an ongoing emergency.' },
          { id: 'c', label: 'The judge finds the statement reliable.' },
          { id: 'd', label: 'The prosecutor stipulates to limited use.' }
        ],
        answer: 'a'
      },
      {
        id: 'all-crimpro-04',
        area: 'Criminal Procedure',
        prompt:
          'Before imposing sentence, Rule 32 requires the court to:',
        choices: [
          { id: 'a', label: 'Promise a specific sentence before hearing the parties.' },
          { id: 'b', label: 'Address the defendant personally to allow them to speak and present mitigation.' },
          { id: 'c', label: 'Defer sentencing until restitution is paid.' },
          { id: 'd', label: 'Adopt the probation recommendation without explanation.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-civpro-01',
        area: 'Civil Procedure',
        prompt:
          'Federal question jurisdiction under 28 U.S.C. § 1331 requires:',
        choices: [
          { id: 'a', label: 'Any case mentioning a federal issue somewhere in the pleadings.' },
          { id: 'b', label: 'A well-pleaded complaint establishing that federal law creates the cause of action or necessarily raises a substantial federal issue.' },
          { id: 'c', label: 'Consent of both parties.' },
          { id: 'd', label: 'An amount in controversy over $75,000.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-civpro-02',
        area: 'Civil Procedure',
        prompt:
          'What is a proper venue in federal civil litigation?',
        choices: [
          { id: 'a', label: 'Any district where the plaintiff resides.' },
          { id: 'b', label: 'A district where any defendant resides if all defendants are residents of the state, or where a substantial part of the events occurred.' },
          { id: 'c', label: 'Only the defendant’s home district.' },
          { id: 'd', label: 'Wherever the plaintiff’s attorney is located.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-civpro-03',
        area: 'Civil Procedure',
        prompt:
          'Rule 13(a) requires compulsory counterclaims to be raised when they arise from:',
        choices: [
          { id: 'a', label: 'Any claim the defendant prefers to litigate now.' },
          { id: 'b', label: 'The same transaction or occurrence as the opposing party’s claim and do not require adding parties outside the court’s jurisdiction.' },
          { id: 'c', label: 'Separate business dealings occurring years earlier.' },
          { id: 'd', label: 'A claim governed by state law only.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-civpro-04',
        area: 'Civil Procedure',
        prompt:
          'To preserve an objection to jury instructions under Rule 51, counsel must:',
        choices: [
          { id: 'a', label: 'File a post-trial motion only.' },
          { id: 'b', label: 'State distinctly the matter objected to and the grounds before the jury retires.' },
          { id: 'c', label: 'Rely on plain error review.' },
          { id: 'd', label: 'Submit an amicus brief on appeal.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-evidence-01',
        area: 'Evidence',
        prompt:
          'A social media post can be authenticated by:',
        choices: [
          { id: 'a', label: 'An affidavit from any person who uses social media.' },
          { id: 'b', label: 'Testimony or circumstantial evidence showing it is what the proponent claims, such as metadata or distinctive characteristics.' },
          { id: 'c', label: 'A notarized certificate regardless of content.' },
          { id: 'd', label: 'Judicial notice of online content.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-evidence-02',
        area: 'Evidence',
        prompt:
          'Under the best evidence rule, when must the original writing be produced?',
        choices: [
          { id: 'a', label: 'Whenever a party seeks to prove the content of the writing and no exception applies.' },
          { id: 'b', label: 'Only if the writing is more than five pages.' },
          { id: 'c', label: 'Whenever the opponent demands it, regardless of relevance.' },
          { id: 'd', label: 'Never; duplicates are always admissible.' }
        ],
        answer: 'a'
      },
      {
        id: 'all-evidence-03',
        area: 'Evidence',
        prompt:
          'Attorney-client privilege protects communications that are:',
        choices: [
          { id: 'a', label: 'Made for legal advice between privileged persons intended to remain confidential.' },
          { id: 'b', label: 'Shared with any third party for convenience.' },
          { id: 'c', label: 'About business advice only.' },
          { id: 'd', label: 'Made after representation ends.' }
        ],
        answer: 'a'
      },
      {
        id: 'all-evidence-04',
        area: 'Evidence',
        prompt:
          'According to the impeachment toolkit, prior inconsistent statements offered solely for impeachment:',
        choices: [
          { id: 'a', label: 'Are inadmissible if the witness denies them.' },
          { id: 'b', label: 'May be used to attack credibility so long as the witness has an opportunity to explain or deny.' },
          { id: 'c', label: 'Require a limiting instruction for the jury to consider them substantively.' },
          { id: 'd', label: 'Must be sworn to be admissible.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-constitutional-01',
        area: 'Constitutional Law',
        prompt:
          'Most Bill of Rights protections apply to the states via:',
        choices: [
          { id: 'a', label: 'The Privileges or Immunities Clause of the Fourteenth Amendment only.' },
          { id: 'b', label: 'The Due Process Clause of the Fourteenth Amendment through selective incorporation.' },
          { id: 'c', label: 'Article I, Section 8.' },
          { id: 'd', label: 'The Ninth Amendment.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-constitutional-02',
        area: 'Constitutional Law',
        prompt:
          'A private party is subject to constitutional limits when:',
        choices: [
          { id: 'a', label: 'They operate any business open to the public.' },
          { id: 'b', label: 'The state significantly involves itself in the conduct, such as through coercion, encouragement, or delegation of a traditional public function.' },
          { id: 'c', label: 'They receive any government funding.' },
          { id: 'd', label: 'They are located in a state capital.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-constitutional-03',
        area: 'Constitutional Law',
        prompt:
          'When strict scrutiny applies to a content-based speech restriction, what must the government show?',
        choices: [
          { id: 'a', label: 'A compelling interest and narrow tailoring using the least restrictive means.' },
          { id: 'b', label: 'A legitimate interest and rational relationship.' },
          { id: 'c', label: 'Only that the law is viewpoint neutral.' },
          { id: 'd', label: 'That the law has popular support.' }
        ],
        answer: 'a'
      },
      {
        id: 'all-constitutional-04',
        area: 'Constitutional Law',
        prompt:
          'Under the voluntariness doctrine, a confession is involuntary when:',
        choices: [
          { id: 'a', label: 'Officers fail to record the interview.' },
          { id: 'b', label: 'Police coercion overbears the suspect’s will under the totality of circumstances.' },
          { id: 'c', label: 'The suspect was tired.' },
          { id: 'd', label: 'No Miranda warnings were given, regardless of coercion.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-remedies-01',
        area: 'Remedies',
        prompt:
          'Specific performance is most often available for:',
        choices: [
          { id: 'a', label: 'Personal service contracts.' },
          { id: 'b', label: 'Unique goods or real property where monetary damages are inadequate.' },
          { id: 'c', label: 'Every contract breach automatically.' },
          { id: 'd', label: 'Sales of fungible goods.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-remedies-02',
        area: 'Remedies',
        prompt:
          'Disgorgement is appropriate when:',
        choices: [
          { id: 'a', label: 'The plaintiff wants punitive damages.' },
          { id: 'b', label: 'The defendant was unjustly enriched and equity requires stripping wrongful gains.' },
          { id: 'c', label: 'The plaintiff cannot prove liability.' },
          { id: 'd', label: 'The contract is void for illegality.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-remedies-03',
        area: 'Remedies',
        prompt:
          'What happens if a plaintiff fails to mitigate reasonably?',
        choices: [
          { id: 'a', label: 'They lose the right to any recovery.' },
          { id: 'b', label: 'Recoverable damages are reduced by the avoidable losses.' },
          { id: 'c', label: 'They owe damages to the defendant.' },
          { id: 'd', label: 'The defendant must pay double damages.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-practice-01',
        area: 'Practice Skills',
        prompt:
          'Effective negotiation requires BATNA preparation. Before a settlement conference you should:',
        choices: [
          { id: 'a', label: 'Keep your best alternative unknown even to your team.' },
          { id: 'b', label: 'Assess your best alternative to a negotiated agreement to understand walk-away points.' },
          { id: 'c', label: 'Avoid estimating litigation costs to stay optimistic.' },
          { id: 'd', label: 'Focus only on the opponent’s weaknesses.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-practice-02',
        area: 'Practice Skills',
        prompt:
          'An appellate advocate should lead with which component of the argument?',
        choices: [
          { id: 'a', label: 'A vivid story about the client’s background.' },
          { id: 'b', label: 'A concise statement of the relief sought and the core rule that justifies it.' },
          { id: 'c', label: 'A summary of all procedural history in chronological order.' },
          { id: 'd', label: 'A critique of opposing counsel’s style.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-practice-03',
        area: 'Practice Skills',
        prompt:
          'What tool supports coordinated investigations when multiple offices are involved?',
        choices: [
          { id: 'a', label: 'Relying on informal text messages.' },
          { id: 'b', label: 'Maintaining a shared operations log documenting assignments, deadlines, and contact with witnesses.' },
          { id: 'c', label: 'Separating teams so information flows only through supervisors.' },
          { id: 'd', label: 'Avoiding status reports to reduce paperwork.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-appellate-01',
        area: 'Appellate Practice',
        prompt:
          'The jurisdictional deadline to file a notice of appeal in federal civil cases is generally:',
        choices: [
          { id: 'a', label: '7 days from judgment.' },
          { id: 'b', label: '30 days from entry of judgment, extended to 60 days when the United States is a party.' },
          { id: 'c', label: '90 days from judgment in all cases.' },
          { id: 'd', label: 'Determined by local custom.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-appellate-02',
        area: 'Appellate Practice',
        prompt:
          'If a critical transcript is missing through no fault of the parties, what is the remedy?',
        choices: [
          { id: 'a', label: 'Dismiss the appeal automatically.' },
          { id: 'b', label: 'Use Federal Rule of Appellate Procedure 10(c) to prepare a statement of the evidence from the best available means and seek district court approval.' },
          { id: 'c', label: 'Request the appellate court to take new testimony.' },
          { id: 'd', label: 'File a new complaint.' }
        ],
        answer: 'b'
      },
      {
        id: 'all-appellate-03',
        area: 'Appellate Practice',
        prompt:
          'An effective amicus brief should:',
        choices: [
          { id: 'a', label: 'Repeat the parties’ arguments without change.' },
          { id: 'b', label: 'Offer unique expertise, data, or perspectives that assist the court beyond the parties’ presentations.' },
          { id: 'c', label: 'Critique the parties for filing the case.' },
          { id: 'd', label: 'Focus on media messaging.' }
        ],
        answer: 'b'
      }
    ]
  }
];
