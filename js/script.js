$(document).ready(function () {
  $("#navbar").load("components/navbar.html");
  $("#footbar").load("components/footbar.html");

  $('html').on('click', '.link-blank', function (e) {
    e.preventDefault();
  
    const url = $(this).attr('link');
  
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  });

  // OPEN
  $('html').on("click", ".menu-mobile-open", function () {
    $(".menu-mobile").removeClass("hidden").addClass("fixed");
  });

  // CLOSE
  $('html').on("click", ".menu-mobile-close", function () {
    $(".menu-mobile").addClass("hidden").removeClass("fixed");
  });

  $(function () {
    const $el = $(".text-writing");
    const text = $el.data("text");
  
    let i = 0;
    let speed = 50;
  
    function typeWriter() {
      if (i <= text.length) {
        let current = text.slice(0, i);
  
        // Highlight "Okthapian" when it appears
        if (current.includes("Okthapian")) {
          current = current.replace(
            "Okthapian",
            '<span class="text-c1-500">Okthapian</span>'
          );
        }
  
        $el.html(current);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
  
    typeWriter();
  });

  
  const whyMeItems = [
    {
      title: "Solution-Oriented",
      icon: "https://cdn-icons-png.flaticon.com/512/2779/2779847.png",
      desc: "I don’t just write code—I solve business problems. Every feature is built with a clear purpose: fast, efficient, and scalable for the long term."
    },
    {
      title: "Custom Development",
      icon: "https://cdn-icons-png.flaticon.com/512/2888/2888407.png",
      desc: "I build custom solutions (WordPress, PHP, Tailwind, etc.) tailored to real needs—lighter, more secure, and easy to maintain."
    },
    {
      title: "Performance & Security",
      icon: "https://cdn-icons-png.flaticon.com/512/9132/9132336.png",
      desc: "Clean structure, optimized performance, SEO-ready, and security built in from day one."
    },
    {
      title: "Clear Communication",
      icon: "https://cdn-icons-png.flaticon.com/512/2600/2600350.png",
      desc: "Easy to work with, transparent progress, and committed until the project is truly ready."
    }
  ];
  
  

  $('.why-me').each(function () {
    const $container = $(this);

    $.each(whyMeItems, function (_, item) {
      const html = `
        <div class="relative flex flex-col">
          <div class="px-4 py-5 flex-auto">
            <img src="${item.icon}"
              class="text-c0-500 p-1 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-we">

            <h6 class="text-xl mb-1 font-semibold">
              ${item.title}
            </h6>

            <p class="mb-4 text-c0-500">
              ${item.desc}
            </p>
          </div>
        </div>
      `;

      $container.append(html);
    });
  });
  

  const myProjects = [
    {
      title: "Login Page",
      link: "#/auth/login",
      image: "https://demos.creative-tim.com/vue-notus/img/login.9c1ecd37.jpg"
    },
    {
      title: "Profile Page",
      link: "#/profile",
      image: "https://demos.creative-tim.com/vue-notus/img/profile.c62f8a5b.jpg"
    },
    {
      title: "Landing Page",
      link: "#/landing",
      image: "https://demos.creative-tim.com/vue-notus/img/landing.8150f1b0.jpg"
    }
  ];

  $('.my-project').each(function () {
    const $container = $(this);

    $.each(myProjects, function (_, project) {
      const html = `
        <div class="w-full lg:w-4/12 px-4">
          <h5 class="text-xl font-semibold pb-4 text-center">
            ${project.title}
          </h5>

          <div link="${project.link}" class="link-blank">
            <div
              class="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-we w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
              <img
                alt="${project.title}"
                class="align-middle border-none max-w-full h-auto rounded-lg"
                src="${project.image}" />
            </div>
          </div>
        </div>
      `;

      $container.append(html);
    });
  });
});
