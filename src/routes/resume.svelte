<script>
  // your script goes here
</script>

<style>
  :global(body) {
    background: #262626;
  }
  article {
    font-family: 'Rubik', sans-serif;
    box-shadow: 0 0 10px black;
    max-width: 21cm;
    margin: 3.5em auto;
    padding: 1em;
    box-sizing: border-box;
    background: #fff;
  }

  span.red {
    color: #dc143c;
  }
  span.blue {
    color: #0080ff;
  }

  a.link {
    text-decoration: none;
    color: rgb(17, 85, 204);
  }

  header {
    font-family: 'Karla', sans-serif;
  }
  header h1 {
    margin-bottom: 0.5em;
    text-align: center;
    font-size: 1.4em;
  }

  section {
    padding: 0 0.25em;
    margin-bottom: 1.25em;
  }
  section header {
    padding: 0.2em 0.15em;
    border-bottom: 1px solid black;
    margin-bottom: -0.2em;
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: bolder;
  }
  section .label {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0.5em 0 0.25em;
    font-family: 'Karla', sans-serif;
    font-size: 0.5em;
  }
  section .label h4 {
    margin: 0;
    font-weight: bolder;
  }
  section .label h4:first-child {
    width: 15em;
    color: #38761d;
  }
  section .label h4:nth-child(2) {
    flex: 1;
    text-align: right;
  }
  section .label h4:last-child {
    width: 16em;
    color: #666666;
  }
  section .description {
    margin-bottom: 0.5em;
    font-family: 'Cabin', sans-serif;
    font-size: 0.5em;
    font-weight: normal;
  }
  section ul {
    padding-left: 1em;
    margin: 0;
    font-weight: 600;
    font-size: 13px;
  }
  section ul li {
    margin-bottom: 0.2em;
    font-size: 0.5em;
    font-weight: 400;
  }

  footer {
    display: flex;
    font-size: 0.4em;
    font-family: 'Inconsolata', monospace;
  }
  footer span {
    width: 11em;
  }
  footer span:nth-child(2) {
    flex: 1;
    text-align: center;
  }
  footer span:last-child {
    text-align: right;
  }

  @media only screen and (min-width: 480px) {
    section .label h4 {
      margin: 0;
      font-weight: bolder;
    }
    section .label h4:first-child {
      color: #38761d;
    }
    section .label h4:nth-child(2) {
      text-align: center;
    }
    section .label h4:last-child {
      text-align: right;
    }
  }
  @media only screen and (min-width: 768px) {
    article {
      padding: 1em 2em;
    }
    header h1 {
      font-size: 3em;
    }

    section header {
      font-size: 1.2em;
    }
    section div {
      padding: 0 0.5em;
    }
    section .label {
      font-size: 0.9em;
    }
    section .description {
      font-size: 0.8em;
    }
    section ul {
      padding-left: 2em;
    }
    section ul li {
      font-size: 1em;
    }
    section .label h4:last-child {
      width: 16em;
    }
    footer {
      font-size: 0.9em;
    }
  }
</style>

<!-- markup (zero or more items) goes here -->
<svelte:head>
  <link rel="shortcut icon" type="image/png" href="images/favicon/resume.png" />
</svelte:head>

<article>
  <header>
    <h1>Ignatius Bagussuputra</h1>
  </header>

  <section>
    <header>Experience</header>

    <div class="label">
      <h4>Front-End Developer</h4>
      <h4>Compfest X</h4>
      <h4>February 2018 &ndash; October 2018</h4>
    </div>
    <div class="description">
      <h5>
        Language Used &mdash;
        <span class="red">JavaScript, React / React Native</span>
      </h5>
    </div>
    <ul>
      <li>Built the website for the biggest IT event held by students in Indonesia</li>
      <li>Built a native/mobile Android app for the event registration system and cashier</li>
    </ul>

    <div class="label">
      <h4>Data Analyst Intern</h4>
      <h4>King Koil Shanghai</h4>
      <h4>January 2018</h4>
    </div>
    <div class="description">
      <h5>
        Language Used &mdash;
        <span class="red">JavaScript, React / React Native</span>
      </h5>
    </div>
    <ul>
      <li>Analyzed data obtained from last month and guide current sales growth and stability accordingly</li>
    </ul>
  </section>

  <section>
    <header>Project</header>

    <div class="label">
      <h4>Cloud-Native Web Development</h4>
      <h4>Private Blogging Site</h4>
      <h4>October 2019</h4>
    </div>
    <ul>
      <li>
        <a href="https://blog.imbagus.com" class="link">blog.imbagus.com</a>
        -
        <span class="blue">Serverless</span>
        development using
        <span class="blue">Lambda</span>
        functions
      </li>
    </ul>

    <div class="label">
      <h4>CSS Framework Development</h4>
      <h4>Aqua Framework</h4>
      <h4>May 2019 / October 2019</h4>
    </div>
    <ul>
      <li>
        <a href="https://www.imbagus.com" class="link">imbagus.com</a>
        - Static development with pure HTML, CSS, and JavaScript
      </li>
    </ul>

    <div class="label">
      <h4>Static Web Development</h4>
      <h4>Portfolio Website</h4>
      <h4>September 2019</h4>
    </div>
    <ul>
      <li>
        <a href="https://www.imbagus.com" class="link">imbagus.com</a>
        - Static development with pure HTML, CSS, and JavaScript
      </li>
    </ul>

    <div class="label">
      <h4>Software Package Development</h4>
      <h4>Scramble</h4>
      <h4>August 2019</h4>
    </div>
    <ul>
      <li>
        <a href="https://scramble.js.org" class="link">scramble.js.org</a>
        - A JavaScript animation library for texts
      </li>
    </ul>

    <div class="label">
      <h4>Cross-Platform Development</h4>
      <h4>Form Automation</h4>
      <h4>January 2019 / July 2019</h4>
    </div>
    <ul>
      <li>Built a web automation program for automatic course planning</li>
      <li>Negate the potentially hours of waiting time</li>
    </ul>

    <div class="label">
      <h4>Software Development</h4>
      <h4>Hashing Algorithm</h4>
      <h4>December 2018</h4>
    </div>
    <ul>
      <li>Built a hashed-based storage with search and store function</li>
    </ul>

    <div class="label">
      <h4>Software Development</h4>
      <h4>Caving System</h4>
      <h4>November 2018</h4>
    </div>
    <ul>
      <li>Built a system that implements AVL Tree to cave</li>
    </ul>

    <div class="label">
      <h4>Assembly Development</h4>
      <h4>LED Sequence Game</h4>
      <h4>October 2018 &ndash; December 2018</h4>
    </div>
    <ul>
      <li>Built a game to remember the sequence of LEDs</li>
      <li>
        Simulated using
        <span class="blue">HAPSIM</span>
        ’s keypad, LED, and LCD
      </li>
    </ul>

    <div class="label">
      <h4>Full-Stack Web Development</h4>
      <h4>Personal Web App</h4>
      <h4>February 2018 &ndash; August 2018</h4>
    </div>
    <ul>
      <li>
        <a href="https://ignatiusmb.herokuapp.com" class="link">herokuapp</a>
        - Developed with CI/CD from GitLab and automatic deployment from Heroku
      </li>
    </ul>

    <div class="label">
      <h4>Static Web Development</h4>
      <h4>Online Resume</h4>
      <h4>January 2018</h4>
    </div>
    <ul>
      <li>
        <a href="https://imbagus.com/resume" class="link">resume</a>
        - Converted this Resume document to a web page using plain HTML, CSS, and JavaScript
      </li>
    </ul>
  </section>

  <section>
    <header>Education</header>

    <div class="label">
      <h4>Bachelor in Computer Science</h4>
      <h4>The University of Indonesia</h4>
      <h4>August 2017 &ndash; Present</h4>
    </div>
  </section>

  <section>
    <header>Co-curricular Activities</header>
    <div class="label">
      <h4>Faculty President</h4>
      <h4>Autonomous Body</h4>
      <h4>December 2018 &ndash; December 2019</h4>
    </div>
    <ul>
      <li>Elected president of an organization for a year</li>
    </ul>
    <div class="label">
      <h4>Project Officer</h4>
      <h4>Yearly Weekend Trip</h4>
      <h4>February 2018 &ndash; December 2018</h4>
    </div>
    <ul>
      <li>Directed and arranged the biggest annual program of an autonomous body</li>
    </ul>
  </section>

  <footer>
    <span>October 10, 2019</span>
    <span>Ignatius Bagussuputra</span>
    <span>Résume</span>
  </footer>
</article>
