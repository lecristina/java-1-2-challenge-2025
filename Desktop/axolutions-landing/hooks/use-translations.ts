"use client"

import { useLanguage } from "@/contexts/language-context"

// Tipo para as traduções
type TranslationKey = string
type TranslationValues = Record<string, string | number>

// Interface para o objeto de traduções
interface Translations {
  [key: string]: {
    "pt-BR": string
    "en-US": string
  }
}

// Objeto com as traduções
const translations: Translations = {
  // Header
  "header.home": {
    "pt-BR": "Home",
    "en-US": "Home",
  },
  "header.about": {
    "pt-BR": "Sobre",
    "en-US": "About",
  },
  "header.projects": {
    "pt-BR": "Projetos",
    "en-US": "Projects",
  },
  "header.blog": {
    "pt-BR": "Blog",
    "en-US": "Blog",
  },
  "header.contact": {
    "pt-BR": "Contato",
    "en-US": "Contact",
  },
  "header.whatsapp.message": {
    "pt-BR": "Olá! Gostaria de saber mais sobre os serviços da Axolutions.",
    "en-US": "Hello! I would like to know more about Axolutions services.",
  },

  // Hero
  "hero.badge": {
    "pt-BR": "Desenvolvimento web de alta performance",
    "en-US": "High-performance web development",
  },
  "hero.title.transforming": {
    "pt-BR": "Transformando",
    "en-US": "Transforming",
  },
  "hero.title.ideasInto": {
    "pt-BR": "Ideias em",
    "en-US": "Ideas into",
  },
  "hero.typewriter.1": {
    "pt-BR": "Performance",
    "en-US": "Performance",
  },
  "hero.typewriter.2": {
    "pt-BR": "Soluções",
    "en-US": "Solutions",
  },
  "hero.typewriter.3": {
    "pt-BR": "Resultados",
    "en-US": "Results",
  },
  "hero.typewriter.4": {
    "pt-BR": "Inovação",
    "en-US": "Innovation",
  },
  "hero.typewriter.5": {
    "pt-BR": "Crescimento",
    "en-US": "Growth",
  },
  "hero.typewriter.6": {
    "pt-BR": "Sucesso",
    "en-US": "Success",
  },
  "hero.description": {
    "pt-BR":
      "Somos especialistas em desenvolvimento de sites, aplicativos e landing pages que convertem visitantes em clientes.",
    "en-US":
      "We are specialists in developing websites, applications, and landing pages that convert visitors into customers.",
  },
  "hero.mobile.title.1": {
    "pt-BR": "A solução ideal",
    "en-US": "The ideal solution",
  },
  "hero.mobile.title.2": {
    "pt-BR": "para sua empresa:",
    "en-US": "for your company:",
  },
  "hero.mobile.description": {
    "pt-BR": "Softwares personalizados e inovadores para impulsionar o seu negócio.",
    "en-US": "Custom and innovative software to boost your business.",
  },
  "hero.cta.contact": {
    "pt-BR": "Entre em contato",
    "en-US": "Contact us",
  },
  "hero.cta.projects": {
    "pt-BR": "Nossos Projetos",
    "en-US": "Our Projects",
  },

  // About
  "about.badge": {
    "pt-BR": "Desenvolvimento Web",
    "en-US": "Web Development",
  },
  "about.title": {
    "pt-BR": "Soluções Digitais de Alto Impacto",
    "en-US": "High-Impact Digital Solutions",
  },
  "about.description": {
    "pt-BR":
      "Desenvolvemos soluções tecnológicas inovadoras que transformam negócios e criam experiências digitais excepcionais para seus usuários.",
    "en-US":
      "We develop innovative technological solutions that transform businesses and create exceptional digital experiences for your users.",
  },
  "about.feature.1.title": {
    "pt-BR": "Inovação Constante",
    "en-US": "Constant Innovation",
  },
  "about.feature.1.description": {
    "pt-BR": "Buscamos sempre as soluções mais inovadoras e eficientes para os desafios de nossos clientes.",
    "en-US": "We always seek the most innovative and efficient solutions for our clients' challenges.",
  },
  "about.feature.2.title": {
    "pt-BR": "Excelência Técnica",
    "en-US": "Technical Excellence",
  },
  "about.feature.2.description": {
    "pt-BR": "Nossa equipe é formada por profissionais altamente qualificados e apaixonados por tecnologia.",
    "en-US": "Our team consists of highly qualified professionals who are passionate about technology.",
  },
  "about.feature.3.title": {
    "pt-BR": "Foco no Cliente",
    "en-US": "Customer Focus",
  },
  "about.feature.3.description": {
    "pt-BR": "Compreendemos que cada empresa é única, por isso criamos soluções personalizadas.",
    "en-US": "We understand that each company is unique, which is why we create customized solutions.",
  },
  "about.feature.4.title": {
    "pt-BR": "Qualidade Garantida",
    "en-US": "Guaranteed Quality",
  },
  "about.feature.4.description": {
    "pt-BR": "Todos os nossos projetos passam por rigorosos testes de qualidade antes da entrega.",
    "en-US": "All our projects undergo rigorous quality testing before delivery.",
  },
  "about.cta": {
    "pt-BR": "Fale com um especialista",
    "en-US": "Talk to an expert",
  },

  // Services
  "services.title": {
    "pt-BR": "Nossos Serviços",
    "en-US": "Our Services",
  },
  "services.description": {
    "pt-BR":
      "Oferecemos uma gama completa de serviços de altíssima qualidade, desde consultoria estratégica até desenvolvimento, implementação e suporte contínuo.",
    "en-US":
      "We offer a complete range of high-quality services, from strategic consulting to development, implementation, and ongoing support.",
  },
  "services.1.title": {
    "pt-BR": "Desenvolvimento de sites",
    "en-US": "Website Development",
  },
  "services.1.description": {
    "pt-BR": "Desenvolvimento de sites personalizados para atender melhor seus clientes.",
    "en-US": "Development of custom websites to better serve your customers.",
  },
  "services.2.title": {
    "pt-BR": "Sistemas Web",
    "en-US": "Web Systems",
  },
  "services.2.description": {
    "pt-BR": "Plataformas web responsivas, seguras e de alta performance.",
    "en-US": "Responsive, secure, and high-performance web platforms.",
  },
  "services.3.title": {
    "pt-BR": "Automações de atendimento",
    "en-US": "Customer Service Automation",
  },
  "services.3.description": {
    "pt-BR": "Automatize seu atendimento com IA humanizada e chatbots personalizados.",
    "en-US": "Automate your customer service with humanized AI and custom chatbots.",
  },
  "services.4.title": {
    "pt-BR": "Sistemas ERP",
    "en-US": "ERP Systems",
  },
  "services.4.description": {
    "pt-BR": "Sistemas integrados para gestão empresarial que otimizam processos e recursos.",
    "en-US": "Integrated business management systems that optimize processes and resources.",
  },
  "services.5.title": {
    "pt-BR": "Aplicativos Mobile",
    "en-US": "Mobile Applications",
  },
  "services.5.description": {
    "pt-BR": "Aplicativos nativos e híbridos com experiência de usuário excepcional.",
    "en-US": "Native and hybrid applications with exceptional user experience.",
  },
  "services.6.title": {
    "pt-BR": "E-commerce",
    "en-US": "E-commerce",
  },
  "services.6.description": {
    "pt-BR": "Crie lojas online personalizadas para atender melhor seus clientes.",
    "en-US": "Create custom online stores to better serve your customers.",
  },
  "services.cta": {
    "pt-BR": "Solicite um orçamento personalizado",
    "en-US": "Request a custom quote",
  },
  "services.whatsapp.message": {
    "pt-BR": "Olá! Gostaria de saber mais sobre os serviços da Axolutions.",
    "en-US": "Hello! I would like to know more about Axolutions services.",
  },

  // Landing Pages
  "landing.badge": {
    "pt-BR": "SOLUÇÃO RÁPIDA E EFICIENTE",
    "en-US": "QUICK AND EFFICIENT SOLUTION",
  },
  "landing.title": {
    "pt-BR": "Landing Pages que Convertem",
    "en-US": "Landing Pages that Convert",
  },
  "landing.description": {
    "pt-BR":
      "Aumente suas conversões com landing pages profissionais e otimizadas para capturar leads e transformar visitantes em clientes.",
    "en-US":
      "Increase your conversions with professional landing pages optimized to capture leads and transform visitors into customers.",
  },
  "landing.why": {
    "pt-BR": "Por que nossas landing pages são superiores?",
    "en-US": "Why our landing pages are superior?",
  },
  "landing.feature.1.title": {
    "pt-BR": "Carregamento Ultra-Rápido",
    "en-US": "Ultra-Fast Loading",
  },
  "landing.feature.1.description": {
    "pt-BR":
      "Otimizadas para performance, nossas landing pages carregam em milissegundos, reduzindo a taxa de abandono.",
    "en-US": "Optimized for performance, our landing pages load in milliseconds, reducing the abandonment rate.",
  },
  "landing.feature.2.title": {
    "pt-BR": "Design Focado em Conversão",
    "en-US": "Conversion-Focused Design",
  },
  "landing.feature.2.description": {
    "pt-BR": "Layouts criados especificamente para guiar seus visitantes até o botão de conversão.",
    "en-US": "Layouts specifically created to guide your visitors to the conversion button.",
  },
  "landing.feature.3.title": {
    "pt-BR": "Métricas e Otimização",
    "en-US": "Metrics and Optimization",
  },
  "landing.feature.3.description": {
    "pt-BR": "Acompanhe o desempenho em tempo real e otimize para aumentar as conversões continuamente.",
    "en-US": "Track performance in real-time and optimize to continuously increase conversions.",
  },
  "landing.offer": {
    "pt-BR": "Oferta Especial",
    "en-US": "Special Offer",
  },
  "landing.offer.description": {
    "pt-BR": "Landing pages personalizadas por apenas:",
    "en-US": "Custom landing pages for just:",
  },
  "landing.offer.price": {
    "pt-BR": "R$ 90",
    "en-US": "R$ 90",
  },
  "landing.offer.period": {
    "pt-BR": "/ Mês",
    "en-US": "/ Month",
  },
  "landing.benefit.1": {
    "pt-BR": "Design personalizado",
    "en-US": "Custom design",
  },
  "landing.benefit.2": {
    "pt-BR": "Hospedagem gratuita",
    "en-US": "Free hosting",
  },
  "landing.benefit.3": {
    "pt-BR": "Formulários de captura de leads",
    "en-US": "Lead capture forms",
  },
  "landing.benefit.4": {
    "pt-BR": "Otimizada para conversão",
    "en-US": "Optimized for conversion",
  },
  "landing.cta": {
    "pt-BR": "Quero uma landing page que converte",
    "en-US": "I want a landing page that converts",
  },

  // Projects
  "projects.portfolio": {
    "pt-BR": "Nosso Portfólio",
    "en-US": "Our Portfolio",
  },
  "projects.title": {
    "pt-BR": "Projetos que Transformam Ideias em Realidade",
    "en-US": "Projects that Transform Ideas into Reality",
  },
  "projects.description": {
    "pt-BR":
      "Conheça alguns dos projetos que desenvolvemos com foco em performance, usabilidade e resultados excepcionais para nossos clientes.",
    "en-US":
      "Discover some of the projects we've developed with a focus on performance, usability, and exceptional results for our clients.",
  },
  "projects.search": {
    "pt-BR": "Buscar projetos...",
    "en-US": "Search projects...",
  },
  "projects.viewProject": {
    "pt-BR": "Ver projeto",
    "en-US": "View project",
  },
  "projects.noResults": {
    "pt-BR": "Nenhum projeto encontrado.",
    "en-US": "No projects found.",
  },
  "projects.error.message": {
    "pt-BR": "Ocorreu um erro ao carregar os projetos",
    "en-US": "An error occurred while loading projects",
  },
  "projects.error.failed": {
    "pt-BR": "Falha ao carregar projetos",
    "en-US": "Failed to load projects",
  },
  "projects.error.retry": {
    "pt-BR": "Tentar novamente",
    "en-US": "Try again",
  },
  "projects.title": {
    "pt-BR": "Nossos Projetos",
    "en-US": "Our Projects",
  },
  "projects.description": {
    "pt-BR": "Conheça alguns dos projetos que desenvolvemos com foco em performance, usabilidade e resultados.",
    "en-US": "Check out some of the projects we've developed with a focus on performance, usability, and results.",
  },
  "projects.loading": {
    "pt-BR": "Carregando projetos...",
    "en-US": "Loading projects...",
  },
  "projects.error": {
    "pt-BR": "Ocorreu um erro ao carregar os projetos.",
    "en-US": "An error occurred while loading the projects.",
  },
  "projects.retry": {
    "pt-BR": "Tentar novamente",
    "en-US": "Try again",
  },
  "projects.empty": {
    "pt-BR": "Nenhum projeto encontrado.",
    "en-US": "No projects found.",
  },
  "projects.view": {
    "pt-BR": "Ver projeto",
    "en-US": "View project",
  },
  "projects.viewAll": {
    "pt-BR": "Ver todos os projetos",
    "en-US": "View all projects",
  },
  "projects.request": {
    "pt-BR": "Solicite um projeto personalizado",
    "en-US": "Request a custom project",
  },

  // Blog
  "blog.title": {
    "pt-BR": "Nosso Blog",
    "en-US": "Our Blog",
  },
  "blog.insights": {
    "pt-BR": "Insights e Conhecimento",
    "en-US": "Insights and Knowledge",
  },
  "blog.description": {
    "pt-BR":
      "Artigos, tutoriais e insights sobre desenvolvimento web, design e as mais recentes tendências em tecnologia.",
    "en-US": "Articles, tutorials, and insights about web development, design, and the latest technology trends.",
  },
  "blog.search": {
    "pt-BR": "Buscar artigos...",
    "en-US": "Search articles...",
  },
  "blog.error.message": {
    "pt-BR": "Ocorreu um erro ao carregar os artigos",
    "en-US": "An error occurred while loading articles",
  },
  "blog.retry": {
    "pt-BR": "Tentar novamente",
    "en-US": "Try again",
  },
  "blog.empty": {
    "pt-BR": "Nenhum artigo encontrado.",
    "en-US": "No articles found.",
  },
  "blog.readMore": {
    "pt-BR": "Ler mais",
    "en-US": "Read more",
  },
  "blog.category.general": {
    "pt-BR": "Geral",
    "en-US": "General",
  },
  "blog.backToBlog": {
    "pt-BR": "Voltar para o blog",
    "en-US": "Back to blog",
  },
  "blog.views": {
    "pt-BR": "visualizações",
    "en-US": "views",
  },
  "blog.loading": {
    "pt-BR": "Carregando posts...",
    "en-US": "Loading posts...",
  },
  "blog.error": {
    "pt-BR": "Ocorreu um erro ao carregar os posts.",
    "en-US": "An error occurred while loading the posts.",
  },
  "blog.retry": {
    "pt-BR": "Tentar novamente",
    "en-US": "Try again",
  },
  "blog.empty": {
    "pt-BR": "Nenhum post encontrado.",
    "en-US": "No posts found.",
  },
  "blog.readMore": {
    "pt-BR": "Ler mais",
    "en-US": "Read more",
  },
  "blog.viewAll": {
    "pt-BR": "Ver todos os artigos",
    "en-US": "View all articles",
  },
  "blog.questions": {
    "pt-BR": "Esclareça suas dúvidas agora",
    "en-US": "Get your questions answered now",
  },
  "blog.category.general": {
    "pt-BR": "Geral",
    "en-US": "General",
  },
  "blog.translating": {
    "pt-BR": "Traduzindo...",
    "en-US": "Translating...",
  },
  "blog.translatingContent": {
    "pt-BR": "Traduzindo conteúdo, por favor aguarde...",
    "en-US": "Translating content, please wait...",
  },

  // Testimonials
  "testimonials.title": {
    "pt-BR": "O Que Dizem Nossos Clientes",
    "en-US": "What Our Clients Say",
  },
  "testimonials.description": {
    "pt-BR": "A satisfação de nossos clientes é o nosso maior orgulho e motivação para continuar inovando.",
    "en-US": "Our clients' satisfaction is our greatest pride and motivation to continue innovating.",
  },
  "testimonials.1.name": {
    "pt-BR": "Carlos Silva",
    "en-US": "Carlos Silva",
  },
  "testimonials.1.position": {
    "pt-BR": "CEO, TechCorp",
    "en-US": "CEO, TechCorp",
  },
  "testimonials.1.content": {
    "pt-BR":
      "A Axolutions transformou completamente nossa operação digital. A equipe entendeu perfeitamente nossas necessidades e entregou uma solução que superou todas as expectativas.",
    "en-US":
      "Axolutions completely transformed our digital operation. The team perfectly understood our needs and delivered a solution that exceeded all expectations.",
  },
  "testimonials.2.name": {
    "pt-BR": "Ana Ferreira",
    "en-US": "Ana Ferreira",
  },
  "testimonials.2.position": {
    "pt-BR": "CTO, Inovare",
    "en-US": "CTO, Inovare",
  },
  "testimonials.2.content": {
    "pt-BR":
      "Trabalhar com a Axolutions foi uma experiência incrível. A equipe é extremamente profissional e dedicada, sempre buscando as melhores soluções para nossos desafios.",
    "en-US":
      "Working with Axolutions was an incredible experience. The team is extremely professional and dedicated, always seeking the best solutions for our challenges.",
  },
  "testimonials.3.name": {
    "pt-BR": "Roberto Mendes",
    "en-US": "Roberto Mendes",
  },
  "testimonials.3.position": {
    "pt-BR": "Diretor, Global Tech",
    "en-US": "Director, Global Tech",
  },
  "testimonials.3.content": {
    "pt-BR":
      "A implementação do sistema desenvolvido pela Axolutions aumentou nossa produtividade em 40%. O investimento valeu cada centavo e continuamos a trabalhar juntos em novos projetos.",
    "en-US":
      "The implementation of the system developed by Axolutions increased our productivity by 40%. The investment was worth every penny, and we continue to work together on new projects.",
  },
  "testimonials.prev": {
    "pt-BR": "Depoimento anterior",
    "en-US": "Previous testimonial",
  },
  "testimonials.next": {
    "pt-BR": "Próximo depoimento",
    "en-US": "Next testimonial",
  },
  "testimonials.goto": {
    "pt-BR": "Ir para o depoimento",
    "en-US": "Go to testimonial",
  },
  "testimonials.cta": {
    "pt-BR": "Seja o próximo caso de sucesso",
    "en-US": "Be the next success story",
  },
  "testimonials.success.story": {
    "pt-BR": "Seja o próximo caso de sucesso",
    "en-US": "Be the next success story",
  },

  // CTA
  "cta.badge": {
    "pt-BR": "Vamos Conversar",
    "en-US": "Let's Talk",
  },
  "cta.title": {
    "pt-BR": "Pronto para Transformar seu Negócio?",
    "en-US": "Ready to Transform Your Business?",
  },
  "cta.description": {
    "pt-BR":
      "Entre em contato conosco hoje mesmo e descubra como nossas soluções tecnológicas podem impulsionar o crescimento da sua empresa.",
    "en-US": "Contact us today and discover how our technological solutions can boost your company's growth.",
  },
  "cta.form.name": {
    "pt-BR": "Nome",
    "en-US": "Name",
  },
  "cta.form.email": {
    "pt-BR": "Email",
    "en-US": "Email",
  },
  "cta.form.message": {
    "pt-BR": "Mensagem",
    "en-US": "Message",
  },
  "cta.form.placeholder.name": {
    "pt-BR": "Seu nome",
    "en-US": "Your name",
  },
  "cta.form.placeholder.email": {
    "pt-BR": "seu@email.com",
    "en-US": "your@email.com",
  },
  "cta.form.placeholder.message": {
    "pt-BR": "Como podemos ajudar você?",
    "en-US": "How can we help you?",
  },
  "cta.form.submit": {
    "pt-BR": "Enviar Mensagem",
    "en-US": "Send Message",
  },
  "cta.form.submitting": {
    "pt-BR": "Enviando...",
    "en-US": "Sending...",
  },
  "cta.form.success.title": {
    "pt-BR": "Mensagem Enviada!",
    "en-US": "Message Sent!",
  },
  "cta.form.success.description": {
    "pt-BR": "Obrigado pelo seu contato. Nossa equipe responderá em breve.",
    "en-US": "Thank you for your message. Our team will respond shortly.",
  },

  // Footer
  "footer.company": {
    "pt-BR": "Empresa",
    "en-US": "Company",
  },
  "footer.resources": {
    "pt-BR": "Recursos",
    "en-US": "Resources",
  },
  "footer.legal": {
    "pt-BR": "Legal",
    "en-US": "Legal",
  },
  "footer.about": {
    "pt-BR": "Sobre",
    "en-US": "About",
  },
  "footer.services": {
    "pt-BR": "Serviços",
    "en-US": "Services",
  },
  "footer.careers": {
    "pt-BR": "Carreiras",
    "en-US": "Careers",
  },
  "footer.contact": {
    "pt-BR": "Contato",
    "en-US": "Contact",
  },
  "footer.blog": {
    "pt-BR": "Blog",
    "en-US": "Blog",
  },
  "footer.documentation": {
    "pt-BR": "Documentação",
    "en-US": "Documentation",
  },
  "footer.faq": {
    "pt-BR": "FAQ",
    "en-US": "FAQ",
  },
  "footer.support": {
    "pt-BR": "Suporte",
    "en-US": "Support",
  },
  "footer.terms": {
    "pt-BR": "Termos",
    "en-US": "Terms",
  },
  "footer.privacy": {
    "pt-BR": "Privacidade",
    "en-US": "Privacy",
  },
  "footer.cookies": {
    "pt-BR": "Cookies",
    "en-US": "Cookies",
  },
  "footer.projects": {
    "pt-BR": "Projetos",
    "en-US": "Projects",
  },
  "footer.technologies": {
    "pt-BR": "Tecnologias",
    "en-US": "Technologies",
  },
  "footer.testimonials": {
    "pt-BR": "Depoimentos",
    "en-US": "Testimonials",
  },
  "footer.description": {
    "pt-BR":
      "Desenvolvemos soluções tecnológicas personalizadas de altíssimo padrão para empresas que buscam o ápice da inovação e excelência.",
    "en-US":
      "We develop high-standard customized technological solutions for companies seeking the pinnacle of innovation and excellence.",
  },
  "footer.copyright": {
    "pt-BR": "Todos os direitos reservados.",
    "en-US": "All rights reserved.",
  },

  // Stats
  "stats.title": {
    "pt-BR": "Nossos Números",
    "en-US": "Our Numbers",
  },
  "stats.description": {
    "pt-BR": "Resultados que comprovam nossa excelência e compromisso com a qualidade.",
    "en-US": "Results that prove our excellence and commitment to quality.",
  },
  "stats.projects": {
    "pt-BR": "Projetos Entregues",
    "en-US": "Projects Delivered",
  },
  "stats.clients": {
    "pt-BR": "Clientes Satisfeitos",
    "en-US": "Satisfied Clients",
  },
  "stats.years": {
    "pt-BR": "Anos de Experiência",
    "en-US": "Years of Experience",
  },
  "stats.team": {
    "pt-BR": "Profissionais",
    "en-US": "Professionals",
  },
  "stats.cta": {
    "pt-BR": "Fale conosco",
    "en-US": "Contact us",
  },
  "stats.projects.completed": {
    "pt-BR": "Projetos Concluídos",
    "en-US": "Completed Projects",
  },
  "stats.client.satisfaction": {
    "pt-BR": "Satisfação dos Clientes",
    "en-US": "Client Satisfaction",
  },
  "stats.specialists": {
    "pt-BR": "Especialistas",
    "en-US": "Specialists",
  },
  "stats.years.experience": {
    "pt-BR": "Anos de Experiência",
    "en-US": "Years of Experience",
  },

  // Technologies
  "tech.title": {
    "pt-BR": "Tecnologias que Utilizamos",
    "en-US": "Technologies We Use",
  },
  "tech.description": {
    "pt-BR":
      "Trabalhamos com as tecnologias mais modernas e eficientes do mercado para entregar soluções de alta qualidade.",
    "en-US": "We work with the most modern and efficient technologies on the market to deliver high-quality solutions.",
  },
  "tech.frontend": {
    "pt-BR": "Frontend",
    "en-US": "Frontend",
  },
  "tech.backend": {
    "pt-BR": "Backend",
    "en-US": "Backend",
  },
  "tech.database": {
    "pt-BR": "Banco de Dados",
    "en-US": "Database",
  },
  "tech.devops": {
    "pt-BR": "DevOps",
    "en-US": "DevOps",
  },
  "tech.specialties": {
    "pt-BR": "NOSSAS ESPECIALIDADES",
    "en-US": "OUR SPECIALTIES",
  },
  "tech.mastered": {
    "pt-BR": "Tecnologias que Dominamos",
    "en-US": "Technologies We Master",
  },
  "tech.description.full": {
    "pt-BR":
      "Construímos soluções robustas usando as tecnologias mais modernas e eficientes do mercado, garantindo alto desempenho e escalabilidade.",
    "en-US":
      "We build robust solutions using the most modern and efficient technologies on the market, ensuring high performance and scalability.",
  },
  "tech.team.description": {
    "pt-BR":
      "Nossa equipe é especializada em desenvolvimento com React, Next.js, Vue.js, Tailwind CSS, Node.js, Python, AWS, TypeScript, Docker e MySQL. Utilizamos essas tecnologias para criar aplicações web modernas, responsivas e de alta performance.",
    "en-US":
      "Our team specializes in development with React, Next.js, Vue.js, Tailwind CSS, Node.js, Python, AWS, TypeScript, Docker, and MySQL. We use these technologies to create modern, responsive, and high-performance web applications.",
  },
  "tech.consult.specialists": {
    "pt-BR": "Consulte nossos especialistas em tecnologia",
    "en-US": "Consult our technology specialists",
  },

  // Global Presence
  "global.title": {
    "pt-BR": "Presença Global",
    "en-US": "Global Presence",
  },
  "global.description": {
    "pt-BR": "Atendemos clientes em todo o mundo, oferecendo soluções personalizadas para cada mercado.",
    "en-US": "We serve clients worldwide, offering customized solutions for each market.",
  },
  "global.countries": {
    "pt-BR": "Países",
    "en-US": "Countries",
  },
  "global.languages": {
    "pt-BR": "Idiomas",
    "en-US": "Languages",
  },
  "global.timezone": {
    "pt-BR": "Fusos Horários",
    "en-US": "Time Zones",
  },
  "global.clients": {
    "pt-BR": "Clientes Globais",
    "en-US": "Global Clients",
  },
  "global.title.main": {
    "pt-BR": "Do Brasil para o Mundo",
    "en-US": "From Brazil to the World",
  },
  "global.subtitle": {
    "pt-BR": "Presença Global",
    "en-US": "Global Presence",
  },
  "global.description.full": {
    "pt-BR":
      "Nossa equipe de desenvolvimento transforma ideias em soluções digitais que atravessam fronteiras. Com clientes ao redor do mundo, levamos a excelência em tecnologia brasileira para todos os continentes.",
    "en-US":
      "Our development team transforms ideas into digital solutions that cross borders. With clients around the world, we bring Brazilian technology excellence to all continents.",
  },
  "global.button": {
    "pt-BR": "Fale com nossa equipe global",
    "en-US": "Talk to our global team",
  },

  // 404 Page
  "404.title": {
    "pt-BR": "Página não encontrada",
    "en-US": "Page not found",
  },
  "404.description": {
    "pt-BR": "A página que você está procurando não existe ou foi movida.",
    "en-US": "The page you are looking for doesn't exist or has been moved.",
  },
  "404.button": {
    "pt-BR": "Voltar para home",
    "en-US": "Back to home",
  },

  // Common
  "common.loading": {
    "pt-BR": "Carregando...",
    "en-US": "Loading...",
  },
  "common.error": {
    "pt-BR": "Ocorreu um erro.",
    "en-US": "An error occurred.",
  },
  "common.tryAgain": {
    "pt-BR": "Tentar novamente",
    "en-US": "Try again",
  },
  "common.readMore": {
    "pt-BR": "Ler mais",
    "en-US": "Read more",
  },
  "common.viewAll": {
    "pt-BR": "Ver todos",
    "en-US": "View all",
  },
  "common.contactUs": {
    "pt-BR": "Entre em contato",
    "en-US": "Contact us",
  },
  "common.learnMore": {
    "pt-BR": "Saiba mais",
    "en-US": "Learn more",
  },
  "common.submit": {
    "pt-BR": "Enviar",
    "en-US": "Submit",
  },
  "common.sending": {
    "pt-BR": "Enviando...",
    "en-US": "Sending...",
  },
  "common.success": {
    "pt-BR": "Sucesso!",
    "en-US": "Success!",
  },
  "common.next": {
    "pt-BR": "Próximo",
    "en-US": "Next",
  },
  "common.previous": {
    "pt-BR": "Anterior",
    "en-US": "Previous",
  },
  "common.close": {
    "pt-BR": "Fechar",
    "en-US": "Close",
  },

  // About Page
  "about.tabs.history": {
    "pt-BR": "Nossa História",
    "en-US": "Our History",
  },
  "about.tabs.mission": {
    "pt-BR": "Missão & Visão",
    "en-US": "Mission & Vision",
  },
  "about.tabs.services": {
    "pt-BR": "Nossos Serviços",
    "en-US": "Our Services",
  },
  "about.tabs.impact": {
    "pt-BR": "Nosso Impacto",
    "en-US": "Our Impact",
  },
  "about.back.home": {
    "pt-BR": "Voltar para Home",
    "en-US": "Back to Home",
  },
  "about.title": {
    "pt-BR": "Sobre a Axolutions",
    "en-US": "About Axolutions",
  },
  "about.subtitle": {
    "pt-BR":
      "Somos a startup líder em desenvolvimento de softwares inovadores, construímos uma reputação sólida pela excelência dos nossos sistemas e compromisso com resultados.",
    "en-US":
      "We are the leading startup in innovative software development, building a solid reputation for the excellence of our systems and commitment to results.",
  },
  "about.history.title": {
    "pt-BR": "Nossa História",
    "en-US": "Our History",
  },
  "about.history.start": {
    "pt-BR": "2021: O início da jornada",
    "en-US": "2021: The beginning of the journey",
  },
  "about.history.start.description": {
    "pt-BR":
      "A Axolutions começou como um grupo de desenvolvedores apaixonados por tecnologia que acreditavam que o desenvolvimento web poderia ser mais eficiente, mais rápido e mais orientado a resultados. Inicialmente focados em projetos freelance, começamos a construir nossa reputação entregando soluções de alta qualidade.",
    "en-US":
      "Axolutions started as a group of developers passionate about technology who believed that web development could be more efficient, faster, and more results-oriented. Initially focused on freelance projects, we began to build our reputation by delivering high-quality solutions.",
  },
  "about.history.team": {
    "pt-BR": "Formação da Equipe",
    "en-US": "Team Formation",
  },
  "about.history.team.description": {
    "pt-BR":
      "Reunimos um time de talentos excepcionais com habilidades complementares em desenvolvimento, design e estratégia de negócios.",
    "en-US":
      "We gathered a team of exceptional talents with complementary skills in development, design, and business strategy.",
  },
  "about.history.projects": {
    "pt-BR": "Primeiros Projetos",
    "en-US": "First Projects",
  },
  "about.history.projects.description": {
    "pt-BR":
      "Começamos com projetos de e-commerce e landing pages de alta conversão, estabelecendo nossa reputação por qualidade e resultados.",
    "en-US":
      "We started with e-commerce projects and high-conversion landing pages, establishing our reputation for quality and results.",
  },
  "about.history.growth": {
    "pt-BR": "2022: Crescimento e Expansão",
    "en-US": "2022: Growth and Expansion",
  },
  "about.history.growth.description": {
    "pt-BR":
      "Com o sucesso dos primeiros projetos, expandimos nossa atuação para desenvolvimento de aplicações web complexas, sistemas de gestão e plataformas digitais inovadoras. Nossa equipe cresceu e começamos a atender clientes de diferentes segmentos.",
    "en-US":
      "With the success of our first projects, we expanded our operations to develop complex web applications, management systems, and innovative digital platforms. Our team grew and we began serving clients from different segments.",
  },
  "about.history.expansion": {
    "pt-BR": "Expansão de Serviços",
    "en-US": "Service Expansion",
  },
  "about.history.expansion.description": {
    "pt-BR":
      "Ampliamos nosso portfólio para incluir desenvolvimento de sistemas ERP, CRM e automações personalizadas, atendendo às necessidades crescentes de nossos clientes.",
    "en-US":
      "We expanded our portfolio to include development of ERP systems, CRM, and custom automations, meeting the growing needs of our clients.",
  },
  "about.history.consolidation": {
    "pt-BR": "2023: Consolidação e Reconhecimento",
    "en-US": "2023: Consolidation and Recognition",
  },
  "about.history.consolidation.description": {
    "pt-BR":
      "Fundamos oficialmente a Axolutions como empresa, consolidando nossa presença no mercado. Hoje, somos reconhecidos pela nossa capacidade de entregar soluções tecnológicas que não apenas atendem, mas superam as expectativas dos nossos clientes, sempre com foco em performance, segurança e experiência do usuário.",
    "en-US":
      "We officially founded Axolutions as a company, consolidating our presence in the market. Today, we are recognized for our ability to deliver technological solutions that not only meet but exceed our clients' expectations, always focusing on performance, security, and user experience.",
  },
  "about.history.recognition": {
    "pt-BR": "Reconhecimento",
    "en-US": "Recognition",
  },
  "about.history.recognition.description": {
    "pt-BR":
      "Conquistamos reconhecimento no mercado por nossas soluções inovadoras e resultados excepcionais para nossos clientes.",
    "en-US":
      "We gained recognition in the market for our innovative solutions and exceptional results for our clients.",
  },
  "about.history.continuous": {
    "pt-BR": "Crescimento Contínuo",
    "en-US": "Continuous Growth",
  },
  "about.history.continuous.description": {
    "pt-BR":
      "Continuamos a crescer, expandindo nossa equipe e portfólio de serviços para atender às demandas do mercado em constante evolução.",
    "en-US":
      "We continue to grow, expanding our team and service portfolio to meet the demands of the constantly evolving market.",
  },
  "about.mission.title": {
    "pt-BR": "Missão & Visão",
    "en-US": "Mission & Vision",
  },
  "about.mission.our": {
    "pt-BR": "Nossa Missão",
    "en-US": "Our Mission",
  },
  "about.mission.description1": {
    "pt-BR":
      "Ajudar empresas de todos os portes com soluções tecnológicas que otimizam a eficiência operacional e aprimoram a gestão de recursos.",
    "en-US":
      "To help companies of all sizes with technological solutions that optimize operational efficiency and improve resource management.",
  },
  "about.mission.description2": {
    "pt-BR":
      "Transformamos ideias em soluções digitais inovadoras que impulsionam o crescimento dos negócios de nossos clientes, sempre com foco em qualidade, performance e resultados mensuráveis.",
    "en-US":
      "We transform ideas into innovative digital solutions that drive our clients' business growth, always focusing on quality, performance, and measurable results.",
  },
  "about.vision.our": {
    "pt-BR": "Nossa Visão",
    "en-US": "Our Vision",
  },
  "about.vision.description1": {
    "pt-BR":
      "Ser reconhecida como referência em desenvolvimento de soluções tecnológicas inovadoras e de alta performance, contribuindo para a transformação digital de empresas em todo o Brasil.",
    "en-US":
      "To be recognized as a reference in the development of innovative and high-performance technological solutions, contributing to the digital transformation of companies throughout Brazil.",
  },
  "about.vision.description2": {
    "pt-BR":
      "Buscamos constantemente a excelência técnica e a satisfação dos nossos clientes, estabelecendo parcerias duradouras baseadas em confiança e resultados.",
    "en-US":
      "We constantly seek technical excellence and customer satisfaction, establishing lasting partnerships based on trust and results.",
  },
  "about.values.our": {
    "pt-BR": "Nossos Valores",
    "en-US": "Our Values",
  },
  "about.values.innovation": {
    "pt-BR": "Inovação",
    "en-US": "Innovation",
  },
  "about.values.innovation.description": {
    "pt-BR":
      "Buscamos constantemente novas tecnologias e abordagens para oferecer soluções inovadoras que tragam vantagem competitiva aos nossos clientes.",
    "en-US":
      "We constantly seek new technologies and approaches to offer innovative solutions that bring competitive advantage to our clients.",
  },
  "about.values.excellence": {
    "pt-BR": "Excelência",
    "en-US": "Excellence",
  },
  "about.values.excellence.description": {
    "pt-BR":
      "Comprometemo-nos com os mais altos padrões de qualidade em tudo o que fazemos, desde o código que escrevemos até o atendimento ao cliente.",
    "en-US":
      "We commit to the highest quality standards in everything we do, from the code we write to customer service.",
  },
  "about.values.transparency": {
    "pt-BR": "Transparência",
    "en-US": "Transparency",
  },
  "about.values.transparency.description": {
    "pt-BR":
      "Mantemos uma comunicação clara e honesta com nossos clientes, parceiros e colaboradores, construindo relações baseadas em confiança.",
    "en-US":
      "We maintain clear and honest communication with our clients, partners, and collaborators, building relationships based on trust.",
  },
  "about.services.title": {
    "pt-BR": "Nossos Serviços",
    "en-US": "Our Services",
  },
  "about.services.description": {
    "pt-BR":
      "Oferecemos uma gama completa de serviços de altíssima qualidade, desde consultoria estratégica até desenvolvimento, implementação e suporte contínuo.",
    "en-US":
      "We offer a complete range of high-quality services, from strategic consulting to development, implementation, and ongoing support.",
  },
  "about.impact.title": {
    "pt-BR": "Nosso Impacto",
    "en-US": "Our Impact",
  },
  "about.impact.description": {
    "pt-BR":
      "Ao longo dos anos, temos ajudado empresas de diversos segmentos a transformar seus negócios através da tecnologia. Nosso impacto vai além do desenvolvimento de software - criamos soluções que geram resultados reais e mensuráveis.",
    "en-US":
      "Over the years, we have helped companies from various segments transform their businesses through technology. Our impact goes beyond software development - we create solutions that generate real and measurable results.",
  },
  "about.impact.results": {
    "pt-BR": "Resultados que Entregamos",
    "en-US": "Results We Deliver",
  },
  "about.impact.productivity": {
    "pt-BR": "Aumento de Produtividade",
    "en-US": "Increased Productivity",
  },
  "about.impact.productivity.description": {
    "pt-BR":
      "Nossas soluções de automação e sistemas integrados aumentam a produtividade das equipes em até 40%, reduzindo tarefas manuais e eliminando processos redundantes.",
    "en-US":
      "Our automation and integrated systems solutions increase team productivity by up to 40%, reducing manual tasks and eliminating redundant processes.",
  },
  "about.impact.cost": {
    "pt-BR": "Redução de Custos",
    "en-US": "Cost Reduction",
  },
  "about.impact.cost.description": {
    "pt-BR":
      "Clientes relatam economia de até 30% em custos operacionais após a implementação de nossas soluções de gestão e automação de processos.",
    "en-US":
      "Clients report savings of up to 30% in operational costs after implementing our management and process automation solutions.",
  },
  "about.impact.conversion": {
    "pt-BR": "Aumento de Conversão",
    "en-US": "Increased Conversion",
  },
  "about.impact.conversion.description": {
    "pt-BR":
      "Nossas landing pages e sites otimizados para conversão apresentam taxas de conversão até 3x maiores que a média do mercado.",
    "en-US":
      "Our landing pages and conversion-optimized sites have conversion rates up to 3x higher than the market average.",
  },
  "about.impact.numbers": {
    "pt-BR": "Nossos Números",
    "en-US": "Our Numbers",
  },
  "about.impact.numbers.description": {
    "pt-BR": "Resultados que comprovam nossa excelência e compromisso com a qualidade.",
    "en-US": "Results that prove our excellence and commitment to quality.",
  },
  "about.impact.projects": {
    "pt-BR": "Projetos Concluídos",
    "en-US": "Completed Projects",
  },
  "about.impact.satisfaction": {
    "pt-BR": "Satisfação dos Clientes",
    "en-US": "Client Satisfaction",
  },
  "about.impact.specialists": {
    "pt-BR": "Especialistas",
    "en-US": "Specialists",
  },
  "about.impact.experience": {
    "pt-BR": "Anos de Experiência",
    "en-US": "Years of Experience",
  },
  "about.impact.development": {
    "pt-BR": "Tempo Médio de Desenvolvimento",
    "en-US": "Average Development Time",
  },
  "about.impact.landing": {
    "pt-BR": "Landing Pages",
    "en-US": "Landing Pages",
  },
  "about.impact.landing.time": {
    "pt-BR": "2 dias",
    "en-US": "2 days",
  },
  "about.impact.websites": {
    "pt-BR": "Sites Institucionais",
    "en-US": "Corporate Websites",
  },
  "about.impact.websites.time": {
    "pt-BR": "5 dias",
    "en-US": "5 days",
  },
  "about.impact.ecommerce": {
    "pt-BR": "E-commerce",
    "en-US": "E-commerce",
  },
  "about.impact.ecommerce.time": {
    "pt-BR": "10 dias",
    "en-US": "10 days",
  },
  "about.impact.systems": {
    "pt-BR": "Sistemas Personalizados",
    "en-US": "Custom Systems",
  },
  "about.impact.systems.time": {
    "pt-BR": "15 a 30 dias",
    "en-US": "15 to 30 days",
  },
  "about.cta.title": {
    "pt-BR": "Vamos transformar suas ideias em realidade",
    "en-US": "Let's transform your ideas into reality",
  },
  "about.cta.description": {
    "pt-BR":
      "Entre em contato conosco hoje mesmo e descubra como podemos ajudar sua empresa a alcançar novos patamares com soluções tecnológicas de ponta.",
    "en-US":
      "Contact us today and discover how we can help your company reach new heights with cutting-edge technological solutions.",
  },
  "about.cta.contact": {
    "pt-BR": "Fale Conosco",
    "en-US": "Contact Us",
  },
  "about.cta.projects": {
    "pt-BR": "Conheça Nossos Projetos",
    "en-US": "Explore Our Projects",
  },
}

export function useTranslations() {
  const { language } = useLanguage()

  // Função para traduzir textos
  const t = (key: TranslationKey, values?: TranslationValues): string => {
    // Verificar se a chave existe no objeto de traduções
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }

    // Obter a tradução para o idioma atual
    let text = translations[key][language]

    // Substituir variáveis se fornecidas
    if (values) {
      Object.entries(values).forEach(([varKey, varValue]) => {
        text = text.replace(new RegExp(`{{${varKey}}}`, "g"), String(varValue))
      })
    }

    return text
  }

  // Função para formatar datas de acordo com o idioma atual
  const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
    const dateObj = date instanceof Date ? date : new Date(date)
    const locale = language === "pt-BR" ? "pt-BR" : "en-US"

    return new Intl.DateTimeFormat(locale, options).format(dateObj)
  }

  return { t, language, formatDate }
}
