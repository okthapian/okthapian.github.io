$(document).ready(function () {
  $("#navbar").load("components/navbar.html");
  $("#footbar").load("components/footbar.html");

  $("html").on("click", ".link-blank", function (e) {
    e.preventDefault();

    const url = $(this).attr("link");

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  });

  // OPEN
  $("html").on("click", ".menu-mobile-open", function () {
    $(".menu-mobile").removeClass("hidden").addClass("fixed");
  });

  // CLOSE
  $("html").on("click", ".menu-mobile-close", function () {
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

    if ($el.length > 0) {
      typeWriter();
    }
  });

  function renderFromJSON(url, selector, callback) {
    $.getJSON(url, function (data) {
      $(selector).each(function () {
        const $container = $(this);
  
        $.each(data, function (_, item) {
          $container.append(callback(item));
        });
      });
    });
  }

  renderFromJSON("dataset/why-me.json", ".why-me", (item) => {
    return `
      <div class="relative flex flex-col">
        <div class="px-4 py-5 flex-auto">
          <img src="${item.icon}" class="w-12 h-12 mb-5 rounded-full">
  
          <h6 class="text-xl font-semibold">
            ${item.title}
          </h6>
  
          <p>${item.desc}</p>
        </div>
      </div>
    `;
  });

  renderFromJSON("dataset/my-project.json", ".my-project", (project) => {
    return `
      <div class="w-full lg:w-4/12 px-4">
        <h5 class="text-xl font-semibold pb-4 text-center">
          ${project.title}
        </h5>
  
        <div link="${project.link}" class="link-blank">
          <div class="hover:-mt-4 shadow-lg rounded-lg">
            <img src="${project.image}" class="rounded-lg"/>
          </div>
        </div>
      </div>
    `;
  });

  var modal_info_data = [
    {
      id: "kebijakan-privasi",
      title: "Privacy Policy",
      subtitle: "Your privacy matters. Learn how we protect your data.",
      content: "components/content/kebijakan-privasi.html",
    },
    {
      id: "about",
      title: "About Me",
      subtitle: "Get to know more about who I am and how I build digital products.",
      content: "components/content/about.html",
    },
    {
      id: "term",
      title: "Terms & Conditions",
      subtitle: "Please read these terms carefully before using this website.",
      content: "components/content/term.html",
    },
  ];
  
  

  // OPEN MODAL
  $.getJSON("dataset/modal-info.json", function (data) {
    modal_info_data = data;
  });
  
  $("html").on("click", ".modal-info-open", function () {
    const contentId = $(this).attr("data-content-id");

    // Cari data di array
    const data = modal_info_data.find((item) => item.id === contentId);

    if (!data) {
      console.warn("Modal content not found:", contentId);
      return;
    }

    // Set title & subtitle
    $(".modal-info-title").html(data.title);
    $(".modal-info-subtitle").html(data.subtitle);

    // Load konten HTML
    $(".modal-info-content").html(
      '<p class="text-center text-sm text-c0-400">Loading...</p>'
    );

    $(".modal-info-content").load(data.content, function (response, status) {
      if (status === "error") {
        $(".modal-info-content").html(
          '<p class="text-red-500 text-sm">Gagal memuat konten.</p>'
        );
      }
    });

    // Tampilkan modal
    $(".modal-info").removeClass("hidden").addClass("flex");

    // Lock scroll body
    $("body").addClass("overflow-hidden");
  });

  // CLOSE MODAL (button X)
  $("html").on("click", ".modal-info-close", function () {
    closeModalInfo();
  });

  // CLOSE MODAL (klik background overlay)
  $("html").on("click", ".modal-info", function (e) {
    if ($(e.target).hasClass("modal-info")) {
      closeModalInfo();
    }
  });

  // CLOSE MODAL (ESC key)
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      closeModalInfo();
    }
  });

  // FUNCTION CLOSE
  function closeModalInfo() {
    $(".modal-info").addClass("hidden").removeClass("flex");

    // Clear content (optional)
    $(".modal-info-content").html("");

    // Unlock scroll
    $("body").removeClass("overflow-hidden");
  }
});
