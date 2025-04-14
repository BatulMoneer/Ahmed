import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {


  constructor(
    private renderer: Renderer2,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.updateCurrentIGSet();
    this.updateCurrentPostersSet();
    this.loadInitialPosts();
    this.loadInitialPrints();
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', Validators.required]
    });
    window.scrollTo({ top: 0 });
  }

  downloadCV() {
    const link = document.createElement('a');
    link.href = '../../../assets/pdf/cv.pdf';
    link.download = 'AhmedCV.pdf';
    link.click();
  }


  // skills
  skills = [
    { image: '../../../assets/images/Ai.png', label: 'Adobe Illustrator', percent: 100 },
    { image: '../../../assets/images/Id.png', label: 'Adobe Indesign', percent: 100 },
    { image: '../../../assets/images/Fig.png', label: 'Figma', percent: 80 },
    { image: '../../../assets/images/Ps.png', label: 'Adobe Photoshop', percent: 90 },
    { image: '../../../assets/images/Pr.png', label: 'Adobe Premiere', percent: 40 }
  ];

  getDashOffset(percent: number): number {
    const circumference = 2 * Math.PI * 45;
    return circumference - (percent / 100) * circumference;
  }

  // projects

  setSelectedCategory(category: string) {
    this.selectedCategory = category;
  }

  // infographics
  IGs = [
    { image: '../../../assets/images/IG (1).png' },
    { image: '../../../assets/images/IG (2).png' },
    { image: '../../../assets/images/IG (3).png' },
    { image: '../../../assets/images/IG (4).png' },
    { image: '../../../assets/images/IG (5).png' },
    { image: '../../../assets/images/IG (6).png' },
    { image: '../../../assets/images/IG (7).png' },
    { image: '../../../assets/images/IG (8).png' },
    { image: '../../../assets/images/IG (9).png' },
    { image: '../../../assets/images/IG (10).png' },
    { image: '../../../assets/images/IG (11).png' },
    { image: '../../../assets/images/IG (12).png' },
    { image: '../../../assets/images/IG (13).png' },
    { image: '../../../assets/images/IG (14).png' },
    { image: '../../../assets/images/IG (15).png' },
    { image: '../../../assets/images/IG (16).png' },
    { image: '../../../assets/images/IG (17).png' },
    { image: '../../../assets/images/IG (18).png' },
    { image: '../../../assets/images/IG (19).png' },
    { image: '../../../assets/images/IG (20).png' },
    { image: '../../../assets/images/IG (21).png' },
    { image: '../../../assets/images/IG (22).png' },
    { image: '../../../assets/images/IG (23).png' }
  ];

  currentIGIndex = 0;
  IGCardsPerPage = 3;
  currentIGSet: any[] = [];




  changeIGIndex(direction: number) {
    this.currentIGIndex = (this.currentIGIndex + direction + this.IGs.length) % this.IGs.length;
    this.updateCurrentIGSet();
  }

  updateCurrentIGSet() {
    this.currentIGSet = [];
    for (let i = 0; i < this.IGCardsPerPage; i++) {
      const index = (this.currentIGIndex + i) % this.IGs.length;
      this.currentIGSet.push(this.IGs[index]);
    }
  }

  getIGCardClass(index: number): string {
    const startIndex = this.currentIGIndex;
    const centerIndex = startIndex + Math.floor(this.IGCardsPerPage / 2);

    if (index === centerIndex) return 'center';
    if (index === startIndex || index === startIndex + this.IGCardsPerPage - 1) return 'side';
    return '';
  }

  // Modal

  isModalOpen = false;
  modalImageUrl = '';
  modalImageAlt = '';

  openModal(src: string, alt: string) {
    this.modalImageUrl = src;
    this.modalImageAlt = alt;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }


  // Art
  artworks = [
    {
      id: '01',
      name: 'Nour Arida',
      description:
        'This piece is a celebration of the elegance and poise of Nour Arida, a public figure whose style and personality inspire creativity. In capturing her likeness, I sought to blend realistic detail with artistic expression, emphasizing both her iconic features and the subtle emotional aura she carries.',
      image: '../../../assets/images/Art (1).png'
    },
    {
      id: '02',
      name: 'Carmen Bsaibes',
      description:
        'This illustrated portrait highlights the elegance and vibrant personality of Lebanese actress Carmen Bsaibes. Using a mix of soft lines and bold details, I aimed to capture her distinct features and expressive charm, blending realism with a touch of artistic interpretation.',
      image: '../../../assets/images/Art (2).png'
    },
    {
      id: '03',
      name: 'Nina Abdel Malak',
      description:
        'This illustration showcases the unique style and energy of Lebanese singer Nina Abdel Malak. Through a combination of delicate lines and vibrant details, I aimed to capture her bold personality and expressive features, bringing a dynamic yet artistic representation to life.',
      image: '../../../assets/images/Art (3).png'
    },
    {
      id: '04',
      name: 'COVID-19',
      description:
        'This artwork symbolizes the resilience and uncertainty faced during the COVID-19 pandemic. Through the character of the "COVID-19 Girl," I aimed to capture the emotions of isolation, hope, and strength, using detailed line work and a muted color palette to reflect the complex atmosphere of the time.',
      image: '../../../assets/images/Art (4).png'
    },
    {
      id: '05',
      name: 'FLOWERS',
      description:
        'This artwork combines the soothing elements of nature and the power of music. The "Girl with Flowers and Music" illustrates a moment of harmony, where delicate flowers and musical notes come together to evoke a sense of peace and creative expression. Through soft lines and vibrant details, this piece reflects the connection between nature, beauty, and the emotional depth of music.',
      image: '../../../assets/images/Art (5).png'
    },
    {
      id: '06',
      name: 'FLOWERS',
      description:
        'This piece captures a serene moment where nature and beauty intertwine. The "Girl with Flowers" illustration blends delicate floral elements with soft, expressive features, creating a harmonious representation of calmness and inner peace. The contrast between the girl and the vibrant flowers highlights the connection between humanity and nature.',
      image: '../../../assets/images/Art (6).png'
    },
    {
      id: '07',
      name: 'Tattooed Grace',
      description:
        'This illustration, titled Ink and Soul, portrays a girl adorned with intricate tattoos that tell a story of individuality and self-expression. The detailed linework captures the contrast between the softness of her features and the boldness of the ink, symbolizing strength, identity, and personal narrative through body art.',
      image: '../../../assets/images/Art (7).png'
    },
    {
      id: '08',
      name: 'Wanderlust Spirit',
      description:
        'This digital artwork, titled Wanderlust Spirit, captures the essence of a free-spirited girl ready for adventure. Through bold colors and dynamic composition, the piece reflects her fearless energy and passion for exploration, symbolizing the excitement of discovering new horizons.',
      image: '../../../assets/images/Art (8).png'
    },
    {
      id: '09',
      name: 'Veiled Secrets',
      description:
        'This digital artwork, titled Veiled Secrets, portrays a girl enveloped in an aura of mystery and intrigue. The use of shadow and light creates depth, inviting viewers to explore her enigmatic expression and the story behind her gaze. This piece captures the essence of allure and the unknown, emphasizing the beauty found in mystery.',
      image: '../../../assets/images/Art (9).png'
    },
    {
      id: '10',
      name: 'Emotional Turmoil',
      description:
        'This digital artwork, titled Emotional Turmoil, captures the raw intensity of a girl expressing deep anger and sadness. The bold contrasts and expressive brushwork highlight her turmoil, conveying a powerful narrative of inner struggle. This piece serves as a reflection on the complexities of emotions and the weight of unspoken feelings.',
      image: '../../../assets/images/Art (10).png'
    },
    {
      id: '11',
      name: 'Lunar Watchers',
      description:
        'This digital artwork depicts a girl and her wolf gazing out from a window, embodying a profound bond between them. The interplay of light and shadow creates an atmosphere of mystery and connection, reflecting their shared loyalty and instinctive understanding. This piece captures the essence of companionship and the wild spirit within.',
      image: '../../../assets/images/Art (11).png'
    }
  ];

  currentArtIndex = 0;
  applyAnimation = true;

  changeArtIndex(direction: number) {
    this.applyAnimation = false;
    this.currentArtIndex = (this.currentArtIndex + direction + this.artworks.length) % this.artworks.length;
    setTimeout(() => {
      this.applyAnimation = true;
    }, 300);
  }

  get currentArt() {
    if (this.currentArtIndex < 0 || this.currentArtIndex >= this.artworks.length) {
       return this.artworks[0];
    }
    return this.artworks[this.currentArtIndex];
  }

  // Posters
  Posters = [
    { image: '../../../assets/images/Poster (1).png' },
    { image: '../../../assets/images/Poster (2).png' },
    { image: '../../../assets/images/Poster (3).png' },
    { image: '../../../assets/images/Poster (4).png' },
    { image: '../../../assets/images/Poster (5).png' },
    { image: '../../../assets/images/Poster (6).png' },
    { image: '../../../assets/images/Poster (7).png' },
    { image: '../../../assets/images/Poster (8).png' },
    { image: '../../../assets/images/Poster (9).png' }
  ];

  currentPosterIndex = 0;
  PostersCardsPerPage = 3;
  currentPostersSet: any[] = [];


  changePostersIndex(direction: number) {
    this.currentPosterIndex = (this.currentPosterIndex + direction + this.Posters.length) % this.Posters.length;
    this.updateCurrentPostersSet();
  }

  updateCurrentPostersSet() {
    this.currentPostersSet = [];
    for (let i = 0; i < this.PostersCardsPerPage; i++) {
      const index = (this.currentPosterIndex + i) % this.Posters.length;
      this.currentPostersSet.push(this.Posters[index]);
    }
  }

  getPosterCardClass(index: number): string {
    const startIndex = this.currentPosterIndex;
    const centerIndex = startIndex + Math.floor(this.PostersCardsPerPage / 2);

    if (index === centerIndex) return 'center';
    if (index === startIndex || index === startIndex + this.PostersCardsPerPage - 1) return 'side';
    return '';
  }

  // Posts
  Posts = [
    { image: '../../../assets/images/Post (1).png'},
    { image: '../../../assets/images/Post (2).png'},
    { image: '../../../assets/images/Post (3).png'},
    { image: '../../../assets/images/Post (4).png'},
    { image: '../../../assets/images/Post (5).png'},
    { image: '../../../assets/images/Post (6).png'},
    { image: '../../../assets/images/Post (7).png'},
    { image: '../../../assets/images/Post (8).png'}

  ]

  initialCount = 0;
  laptopPostsToShow = 8;
  tabletPostsToShow = 6;
  mobilePostsToShow = 4;
  displayedPosts: any[] = [];
  showAllPosts = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.loadInitialPosts();
  }

  loadInitialPosts() {
     const screenWidth = window.innerWidth;
     this.initialCount = this.laptopPostsToShow;


     if (screenWidth <= 1000) {
      this.initialCount = this.tabletPostsToShow;
     }
     if (screenWidth <= 700) {
      this.initialCount = this.mobilePostsToShow;
     }
     if (this.initialCount == this.Posts.length){
      this.showAllPosts = true;
    }
    else {
      this.showAllPosts = false;
    }
      this.displayedPosts = this.Posts.slice(0, this.initialCount);
     }

  loadMorePosts() {
    this.showAllPosts = true;
    this.displayedPosts = [...this.Posts];
  }
  showLessPosts() {
     this.showAllPosts = false;
     this.loadInitialPosts();
   }


   // Prints

   Prints = [
    { image: '../../../assets/images/Print (1).png'},
    { image: '../../../assets/images/Print (2).png'},
    { image: '../../../assets/images/Print (3).png'},
  ]
  initialPrintsToShow = 1;
  displayedPrints: any[] = [];
  showAllPrints = false;

  loadInitialPrints() {
    this.displayedPrints = this.Prints.slice(0, this.initialPrintsToShow);
  }

  loadMorePrints() {
    this.showAllPrints = true;
    this.displayedPrints = [...this.Prints];
  }

  showLessPrints() {
    this.showAllPrints = false;
    this.loadInitialPrints();
  }



  categories = ['Infographic', 'Art', 'Posters', 'Posts', 'Prints', 'Ai'];
  selectedCategory = 'Infographic';

  // contact
  contactForm!: FormGroup;
  isSubmitting = false;
  submissionStatus: 'success' | 'error' | null = null;
  statusMessage = '';
  formspreeEndpoint = 'https://formspree.io/f/xjkylzqo';
  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.statusMessage = 'Please fill out all required fields correctly.';
      this.submissionStatus = 'error';
      return;
    }

    this.isSubmitting = true;
    this.submissionStatus = null;
    this.statusMessage = '';

    const formData = this.contactForm.value;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    this.http.post(this.formspreeEndpoint, formData, { headers: headers })
      .subscribe({
        next: (response) => {
          console.log('Formspree success response:', response);
          this.statusMessage = 'Thanks for your submission!';
          this.submissionStatus = 'success';
          this.contactForm.reset();
          Object.keys(this.contactForm.controls).forEach(key => {
            this.contactForm.get(key)?.setErrors(null) ;
            this.contactForm.get(key)?.markAsUntouched();
            this.contactForm.get(key)?.markAsPristine();
          });

        },
        error: (error) => {
          console.error('Formspree error response:', error);
          const formspreeError = error?.error?.errors?.[0]?.message;
          this.statusMessage = formspreeError ? `Error: ${formspreeError}` : 'Oops! There was a problem submitting your form.';
          this.submissionStatus = 'error';
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }


}
