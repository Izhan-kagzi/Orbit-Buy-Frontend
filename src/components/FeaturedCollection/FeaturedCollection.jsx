import { Link } from "react-router-dom";
import menformal from "../../assets/instagram/menformal.jpeg";
import womencordset1 from "../../assets/instagram/womencordset1.jpg";
import womenformal from "../../assets/instagram/womenformal.png";
import womendress1 from "../../assets/instagram/womendress1.png";
import trackpant from "../../assets/instagram/trackpant.png";
import womenjumpsuit from "../../assets/instagram/womenjumpsuit.png";
import menjacket from "../../assets/instagram/menjacket.png";

const lookbookItems = [
  {
    id: 1,
    image: womencordset1,
    category: "WOMEN",
    title: "Modern Elegance",
    link: "/women-cordset",
    className: "lookbook-1",
  },
  {
    id: 2,
    image: menjacket,
    category: "MEN",
    title: "Effortlessly Styled",
    link: "/men-jackets",
    className: "lookbook-2",
  },
  {
    id: 3,
    image: menformal,
    category: "MEN",
    title: "Modern Essentials",
    link: "/search?q=men",
    className: "lookbook-3",
  },
  {
    id: 4,
    image: trackpant,
    category: "COUPLES",
    title: "Athleisure Essentials",
    link: "/mens-trackpants",
    className: "lookbook-4",
  },
  {
    id: 5,
    image: womenformal,
    category: "WOMEN",
    title: "Timeless Style",
    link: "/women-formals",
    className: "lookbook-5",
  },
  {
    id: 6,
    image: womendress1,
    category: "STYLE",
    title: "Own Your Look",
    link: "/women-dresses",
    className: "lookbook-6",
  },
  {
    id: 7,
    image: womenjumpsuit,
    category: "MEN",
    title: "Everyday Sophistication",
    link: "/women-jumpsuits",
    className: "lookbook-7",
  },
];

const LookbookImage = ({ item }) => {
  return (
    <Link
      to={item.link}
      className={`lookbook-item ${item.className} group`}
      aria-label={`${item.category}: ${item.title}`}
    >
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
          transition-transform
          duration-[1400ms]
          ease-out
          group-hover:scale-105
        "
      />

      {/* Image overlay */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/65
          via-black/10
          to-transparent
          opacity-70
          group-hover:opacity-90
          transition-opacity
          duration-500
        "
      />

      {/* Image information */}
      <div
        className="
          absolute
          left-5
          right-5
          bottom-5
          sm:left-7
          sm:right-7
          sm:bottom-7
          text-white
        "
      >
        <p
          className="
            text-[9px]
            sm:text-[10px]
            uppercase
            tracking-[3px]
            font-medium
            text-white/70
            mb-1.5
          "
        >
          {item.category}
        </p>

        <h3
          className="
            font-serif
            text-xl
            sm:text-2xl
            lg:text-3xl
            leading-tight
          "
        >
          {item.title}
        </h3>
      </div>
    </Link>
  );
};

const FeaturedCollection = () => {
  return (
    <section className="bg-[#eeeae3] py-16 sm:py-20 md:py-24 overflow-hidden">

      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="lookbook-header">

          <p className="lookbook-eyebrow">
            STYLE INSPIRATION
          </p>

          <h2 className="lookbook-title">
            The Lookbook
          </h2>

          <div className="lookbook-line" />

          <p className="lookbook-subtitle">
            ELEVATED STYLES FOR EVERY OCCASION
          </p>

        </div>

        {/* =====================================================
            DESKTOP COLLAGE
        ====================================================== */}

        <div className="lookbook-collage">

          {/* 1 — Tall Women's Image */}
          <LookbookImage item={lookbookItems[0]} />

          {/* 2 — Large Couple Image */}
          <LookbookImage item={lookbookItems[1]} />

          {/* 3 — Tall Men's Image */}
          <LookbookImage item={lookbookItems[2]} />

          {/* 4 — Small Couple Image */}
          <LookbookImage item={lookbookItems[3]} />

          {/* 5 — Women's Image */}
          <LookbookImage item={lookbookItems[4]} />

          {/* 6 — Editorial Text */}
          <div className="lookbook-editorial">

            <span>
              STYLE NOTES
            </span>

            <h3>
              Effortlessly
              <br />
              Elegant
            </h3>

            <p>
              Discover pieces that work beautifully together,
              from everyday essentials to statement looks.
            </p>

          </div>

          {/* 7 — Bottom Men's Image */}
          <LookbookImage item={lookbookItems[5]} />

          {/* 8 — Extra Men's Image */}
          <LookbookImage item={lookbookItems[6]} />

        </div>

        {/* =====================================================
            SHOP BUTTONS
        ====================================================== */}

        <div className="lookbook-actions">

          <Link
            to="/search?q=men"
            className="lookbook-button lookbook-button-dark"
          >
            SHOP MEN'S STYLE
          </Link>

          <Link
            to="/search?q=women"
            className="lookbook-button lookbook-button-light"
          >
            SHOP WOMEN'S STYLE
          </Link>

        </div>

      </div>

      {/* =======================================================
          CSS
      ======================================================== */}

      <style>{`

        /* ================= HEADER ================= */

        .lookbook-header {
          text-align: center;
          margin-bottom: 42px;
        }

        .lookbook-eyebrow {
          color: #756b60;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 5px;
          margin-bottom: 18px;
        }

        .lookbook-title {
          color: #292521;
          font-family: Georgia, "Times New Roman", serif;
          font-style: italic;
          font-size: clamp(52px, 8vw, 110px);
          font-weight: 400;
          line-height: 0.95;
          margin: 0;
        }

        .lookbook-line {
          width: 120px;
          height: 1px;
          background: #82796f;
          margin: 25px auto 20px;
        }

        .lookbook-subtitle {
          color: #756b60;
          font-size: 11px;
          letter-spacing: 4px;
          font-weight: 500;
        }


        /* ================= COLLAGE ================= */

        .lookbook-collage {
          display: grid;

          /*
            3 columns

            ┌────────┬────────┬────────┐
            │        │        │        │
            │ IMAGE1 │ IMAGE2 │ IMAGE2 │
            │        │        │        │
            ├────────┼────────┼────────┤
            │ IMAGE1 │ IMAGE4 │ IMAGE5 │
            ├────────┼────────┼────────┤
            │ IMAGE3 │ TEXT   │ IMAGE6 │
            ├────────┼────────┼────────┤
            │ IMAGE3 │ IMAGE7 │ IMAGE6 │
            └────────┴────────┴────────┘
          */

          grid-template-columns:
            1fr
            0.95fr
            1fr;

          grid-template-rows:
            440px
            320px
            300px
            300px;

          gap: 6px;

          background: #241f1a;

          overflow: hidden;

          border-radius: 4px;
        }


        /* Every image */

        .lookbook-item {
          position: relative;
          display: block;
          overflow: hidden;
          min-width: 0;
          min-height: 0;
          background: #ddd;
        }


        /* Image 1 */

        .lookbook-1 {
          grid-column: 1;
          grid-row: 1 / 3;
        }


        /* Image 2 */

        .lookbook-2 {
          grid-column: 2 / 4;
          grid-row: 1;
        }


        /* Image 3 */

        .lookbook-3 {
          grid-column: 1;
          grid-row: 3 / 5;
        }


        /* Image 4 */

        .lookbook-4 {
          grid-column: 2;
          grid-row: 2;
        }


        /* Image 5 */

        .lookbook-5 {
          grid-column: 3;
          grid-row: 2;
        }


        /* Editorial center */

        .lookbook-editorial {
          grid-column: 2;
          grid-row: 3;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          text-align: center;

          padding: 35px;

          background: #241f1a;
          color: white;
        }

        .lookbook-editorial span {
          font-size: 9px;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 18px;
        }

        .lookbook-editorial h3 {
          margin: 0;

          font-family: Georgia, "Times New Roman", serif;

          font-style: italic;

          font-size: clamp(30px, 3vw, 46px);

          line-height: 1.05;

          font-weight: 400;
        }

        .lookbook-editorial p {
          max-width: 250px;

          margin-top: 18px;

          color: rgba(255,255,255,0.58);

          font-size: 12px;

          line-height: 1.7;
        }


        /* Image 6 */

        .lookbook-6 {
          grid-column: 3;
          grid-row: 3 / 5;
        }


        /* Image 7 */

        .lookbook-7 {
          grid-column: 2;
          grid-row: 4;
        }


        /* ================= BUTTONS ================= */

        .lookbook-actions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;

          margin-top: 40px;
        }

        .lookbook-button {
          display: inline-flex;

          align-items: center;
          justify-content: center;

          min-width: 190px;

          padding: 14px 25px;

          border-radius: 999px;

          font-size: 10px;

          font-weight: 600;

          letter-spacing: 2px;

          transition:
            transform 0.3s ease,
            background 0.3s ease,
            color 0.3s ease;

        }

        .lookbook-button:hover {
          transform: translateY(-2px);
        }

        .lookbook-button-dark {
          background: #292521;
          color: white;
        }

        .lookbook-button-dark:hover {
          background: #09335a;
        }

        .lookbook-button-light {
          border: 1px solid #292521;
          color: #292521;
          background: transparent;
        }

        .lookbook-button-light:hover {
          background: #292521;
          color: white;
        }


        /* =====================================================
           TABLET
        ====================================================== */

        @media (max-width: 900px) {

          .lookbook-collage {
            grid-template-rows:
              360px
              260px
              250px
              250px;
          }

          .lookbook-editorial {
            padding: 20px;
          }

          .lookbook-editorial p {
            font-size: 11px;
          }

        }


        /* =====================================================
           MOBILE
        ====================================================== */

        @media (max-width: 767px) {

          .lookbook-header {
            margin-bottom: 28px;
          }

          .lookbook-title {
            font-size: 56px;
          }

          .lookbook-subtitle {
            font-size: 8px;
            letter-spacing: 2.5px;
          }

          /*
             Mobile becomes a clean editorial collage
          */

          .lookbook-collage {
            display: grid;

            grid-template-columns: 1fr 1fr;

            grid-template-rows:
              430px
              270px
              300px
              270px
              300px;

            gap: 4px;
          }


          /* Women's tall image */

          .lookbook-1 {
            grid-column: 1 / 3;
            grid-row: 1;
          }


          /* Couple */

          .lookbook-2 {
            grid-column: 1 / 3;
            grid-row: 2;
          }


          /* Men's */

          .lookbook-3 {
            grid-column: 1;
            grid-row: 3;
          }


          /* Couple */

          .lookbook-4 {
            grid-column: 2;
            grid-row: 3;
          }


          /* Women's */

          .lookbook-5 {
            grid-column: 1;
            grid-row: 4;
          }


          /* Editorial */

          .lookbook-editorial {
            grid-column: 2;
            grid-row: 4;

            padding: 20px;
          }

          .lookbook-editorial h3 {
            font-size: 25px;
          }

          .lookbook-editorial p {
            font-size: 9px;
            line-height: 1.5;
            margin-top: 12px;
          }


          /* Bottom couple */

          .lookbook-6 {
            grid-column: 1 / 3;
            grid-row: 5;
          }


          /* Hide extra seventh image on very small screens */

          .lookbook-7 {
            display: none;
          }


          .lookbook-actions {
            flex-direction: column;

            width: 100%;

            margin-top: 28px;
          }

          .lookbook-button {
            width: 100%;
          }

        }

      `}</style>

    </section>
  );
};

export default FeaturedCollection;