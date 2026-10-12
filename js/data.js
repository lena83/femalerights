// All content for "Her Story Through Time".
// Levels for each right: 0 = No, 1 = Partly / with limits, 2 = Yes.
// Marriage ages are the usual (mean or median) age of women at first marriage.
// Before about 1900 these are historians' estimates and vary a lot between
// town and village, rich and poor — they are rounded on purpose.

const ERAS = [1850, 1880, 1900, 1925, 1945, 1965, 1990, 2025];

const ERA_CONTEXT = {
  1850: "Steam trains and telegraphs are brand new. Almost nowhere in the world can women vote.",
  1880: "The first girls' secondary schools and women's colleges are opening. Married women in Britain win the right to keep their own wages.",
  1900: "Bicycles, typewriters and telephones give women new freedom. In 1893 New Zealand became the first country where women could vote.",
  1925: "After the First World War, women in many countries have won the vote — and cut their hair short.",
  1945: "The Second World War has ended. Millions of women did 'men's jobs' during the war and proved they could.",
  1965: "The space race and pop music. Women campaign for equal pay and equal chances at work.",
  1990: "Most of these countries now have laws against treating women unfairly. Women lead governments and fly into space.",
  2025: "Girls in all five countries can go to school and university. The big questions now: equal pay, safety, and sharing the housework."
};

const RIGHTS = [
  { key: "vote",     label: "Vote in national elections" },
  { key: "property", label: "Own property and keep her money after marrying" },
  { key: "work",     label: "Choose her own job" },
  { key: "business", label: "Run her own business" },
  { key: "school",   label: "Go to university" }
];

const LEVELS = ["No", "Partly", "Yes"];

const COUNTRIES = [
  { id: "uk",     name: "United Kingdom", skin: "#f1d2b6", hair: "#5b3a26" },
  { id: "usa",    name: "United States",  skin: "#efcfb0", hair: "#4a3020" },
  { id: "russia", name: "Russia",         skin: "#f3d6bd", hair: "#7a5434", eraName: true },
  { id: "turkey", name: "Turkey",         skin: "#e2b892", hair: "#2e211a" },
  { id: "china",  name: "China",          skin: "#ecc8a2", hair: "#1e1a19" }
];

// Year women won the vote (national elections).
const VOTE_MILESTONES = [
  { id: "nz",     label: "New Zealand", year: 1893, note: "First country in the world where women could vote in national elections." },
  { id: "russia", label: "Russia", year: 1917, note: "Granted by the Provisional Government after the February Revolution." },
  { id: "uk",     label: "United Kingdom", year: 1918, end: 1928, note: "1918: women over 30 who met property rules. 1928: all women over 21, the same as men." },
  { id: "usa",    label: "United States", year: 1920, end: 1965, note: "1920: the 19th Amendment. 1965: the Voting Rights Act removed rules that blocked many Black women (and men) in the South." },
  { id: "turkey", label: "Turkey", year: 1930, end: 1934, note: "1930: local elections. 1934: national elections — earlier than France (1944) or Italy (1945)." },
  { id: "china",  label: "China", year: 1947, end: 1949, note: "1947: the Republic of China constitution. 1949: the People's Republic declared women and men equal." }
];

// DATA[countryId][year]
const DATA = {
  uk: {
    1850: {
      state: "United Kingdom",
      rights: { vote: 0, property: 0, work: 1, business: 1, school: 0 },
      age: 26,
      dress: { style: "crinoline", hair: "center", main: "#56708f", accent: "#efe6d4",
        name: "Bell skirt and petticoats",
        text: "Skirts were held out by up to six layers of petticoats; the steel 'cage crinoline' arrived in 1856. A tight corset pinched the waist." },
      note: "A married woman legally belonged to her husband. Her wages, her property and even her children were under his control, a rule called coverture. Working-class women worked long hours in cotton mills or as servants. Rich girls learned music, drawing and French at home, but not science.",
      star: { name: "Florence Nightingale", text: "Nurse who made army hospitals cleaner and safer during the Crimean War (1854) and later founded a nursing school." }
    },
    1880: {
      state: "United Kingdom",
      rights: { vote: 1, property: 1, work: 1, business: 1, school: 1 },
      age: 26,
      dress: { style: "bustle", hair: "bun", main: "#7a3b48", accent: "#dcb68e",
        name: "The bustle",
        text: "A pad or wire frame tied at the back made the skirt stick out behind. The front of the dress became flat and narrow." },
      note: "From 1870 married women could keep the money they earned, and from 1882 their own property. Since 1869 some unmarried women who paid local taxes could vote in town elections, but not for Parliament. Girton College opened at Cambridge in 1869, though Cambridge would not give women degrees. London University did, from 1878.",
      star: { name: "Elizabeth Garrett Anderson", text: "The first woman to qualify as a doctor in Britain (1865). In 1908 she became the first woman mayor in England." }
    },
    1900: {
      state: "United Kingdom",
      rights: { vote: 1, property: 2, work: 1, business: 1, school: 1 },
      age: 26,
      dress: { style: "sbend", hair: "gibson", main: "#3d4b60", accent: "#f6f2ea",
        name: "Blouse and S-bend corset",
        text: "A high-necked blouse and a long, sweeping skirt. Women who rode the new safety bicycles sometimes wore loose 'bloomers' instead." },
      note: "Women could now study at many universities, but Oxford and Cambridge still refused them degrees. Campaigners called suffragists, and from 1903 the more daring suffragettes, fought for the vote. New jobs opened in teaching, nursing, shops and offices, where women worked the new typewriters.",
      star: { name: "Emmeline Pankhurst", text: "Founded the Women's Social and Political Union in 1903. Its members, the suffragettes, marched, protested and went to prison for the vote." }
    },
    1925: {
      state: "United Kingdom",
      rights: { vote: 1, property: 2, work: 1, business: 2, school: 2 },
      age: 25.5,
      dress: { style: "flapper", hair: "cloche", main: "#3c7d78", accent: "#d9c27c", hat: "#8a4b5a",
        name: "Dropped-waist dress and cloche hat",
        text: "Hemlines rose towards the knee, which shocked many people. Women cut their hair into a short 'bob' and stopped wearing tight corsets." },
      note: "After the First World War, women over 30 who met property rules won the vote (1918). Equal voting at 21, the same as men, came in 1928. A 1919 law opened jobs like lawyer and accountant, but many employers sacked women when they married. This was called the marriage bar.",
      star: { name: "Nancy Astor", text: "In 1919 she became the first woman to take a seat in the House of Commons." }
    },
    1945: {
      state: "United Kingdom",
      rights: { vote: 2, property: 2, work: 1, business: 2, school: 2 },
      age: 24.5,
      dress: { style: "forties", hair: "rolls", main: "#5c6b47", accent: "#c9a24c",
        name: "'Utility' suit dress",
        text: "Clothes were rationed, so skirts were short and plain with square shoulders. Many women wore trousers or overalls for factory work." },
      note: "During the Second World War women built planes, drove ambulances, worked on farms as 'Land Girls' and decoded secret messages at Bletchley Park. The marriage bar ended for teachers (1944) and civil servants (1946). Women still earned much less than men for the same work, and Cambridge only gave women full degrees from 1948.",
      star: { name: "Princess Elizabeth", text: "The future Queen trained as a mechanic and truck driver in the women's army, the ATS, in 1945." }
    },
    1965: {
      state: "United Kingdom",
      rights: { vote: 2, property: 2, work: 1, business: 1, school: 2 },
      age: 22.5,
      dress: { style: "mini", hair: "bob", main: "#e07a2c", accent: "#232026", boots: true,
        name: "The miniskirt",
        text: "Short, bright shift dresses with knee-high boots. London became the centre of world fashion." },
      note: "It was still legal to pay a woman less than a man for the same job, until the Equal Pay Act of 1970. Banks often asked for a man's signature before giving a woman a loan, until a 1975 law stopped this. More girls than ever were going to university.",
      star: { name: "Mary Quant", text: "Designer who ran her own fashion business and made the miniskirt famous." }
    },
    1990: {
      state: "United Kingdom",
      rights: { vote: 2, property: 2, work: 2, business: 2, school: 2 },
      age: 25.5,
      dress: { style: "suit", hair: "long", main: "#2c3f68", accent: "#f2f0f4",
        name: "'Power dressing'",
        text: "Suits with big shoulder pads for the office, and jeans and trainers at the weekend." },
      note: "Laws now banned paying women less (1970) or treating them unfairly because they were women (1975). In 1979 Margaret Thatcher became the first woman Prime Minister. On average women still earned less than men. This is called the pay gap.",
      star: { name: "Helen Sharman", text: "A chemist who in 1991 became the first British person in space." }
    },
    2025: {
      state: "United Kingdom",
      rights: { vote: 2, property: 2, work: 2, business: 2, school: 2 },
      age: 31.5,
      dress: { style: "jeans", hair: "pony", main: "#c64b5c", accent: "#3b5d90",
        name: "Anything goes",
        text: "Jeans, trousers, dresses, sports kit. No law says what a woman must wear." },
      note: "Women and men have equal rights by law. More women than men now go to university. Women still do more of the unpaid housework and childcare and hold fewer top jobs, but this is changing.",
      star: { name: "Maggie Aderin-Pocock", text: "Space scientist who builds instruments for telescopes and satellites and presents astronomy on TV." }
    }
  },

  usa: {
    1850: {
      state: "United States",
      rights: { vote: 0, property: 1, work: 1, business: 1, school: 1 },
      age: 21,
      dress: { style: "crinoline", hair: "center", main: "#8a5a3c", accent: "#f1e7d2",
        name: "Full skirts and bonnets",
        text: "Like in Britain, skirts were wide and long. In 1851 Amelia Bloomer promoted a shorter skirt over loose 'Turkish trousers'. People laughed, but it was a bold idea about freedom to move." },
      note: "In 1848 at Seneca Falls, New York, women wrote a 'Declaration of Sentiments' demanding equal rights, including the vote. New York had just let married women keep their own property (1848). Enslaved Black women had no rights at all until slavery ended in 1865.",
      star: { name: "Harriet Tubman", text: "Escaped slavery in 1849, then went back again and again to guide others to freedom on the Underground Railroad." }
    },
    1880: {
      state: "United States",
      rights: { vote: 1, property: 1, work: 1, business: 1, school: 1 },
      age: 22,
      dress: { style: "bustle", hair: "bun", main: "#2f5e52", accent: "#e1c9a0",
        name: "The bustle",
        text: "The skirt was pulled back over a padded frame. Day dresses buttoned all the way up to the chin." },
      note: "Wyoming Territory (1869) and Utah (1870) let women vote, the first places in the country to do so. Oberlin College had taught women since 1837, and new women's colleges like Vassar (1861) opened. Many states were starting to let wives keep their own wages.",
      star: { name: "Susan B. Anthony", text: "Arrested in 1872 for voting. She spent her whole life campaigning for women's right to vote." }
    },
    1900: {
      state: "United States",
      rights: { vote: 1, property: 2, work: 1, business: 1, school: 2 },
      age: 22,
      dress: { style: "sbend", hair: "gibson", main: "#4b3a5e", accent: "#f7f3ec",
        name: "The 'Gibson Girl'",
        text: "A crisp blouse, a long skirt and piled-up hair, named after drawings by the artist Charles Dana Gibson." },
      note: "Most states now let married women own property and keep their wages. Women made up about a third of college students, but law and medicine still put up barriers. Women could vote in only four western states.",
      star: { name: "Madam C. J. Walker", text: "The daughter of formerly enslaved parents. She built a hair-care company and became one of America's first self-made women millionaires." }
    },
    1925: {
      state: "United States",
      rights: { vote: 2, property: 2, work: 1, business: 1, school: 2 },
      age: 21.3,
      dress: { style: "flapper", hair: "bob", main: "#8b2f52", accent: "#e8cf86",
        name: "The flapper",
        text: "Knee-length beaded dresses for dancing the Charleston, short bobbed hair and lipstick." },
      note: "The 19th Amendment (1920) gave women the vote nationwide. But many Black women in the South were blocked from voting by unfair rules until the Voting Rights Act of 1965. Native American women gained citizenship in 1924.",
      star: { name: "Amelia Earhart", text: "In 1932 she became the first woman to fly solo across the Atlantic Ocean." }
    },
    1945: {
      state: "United States",
      rights: { vote: 2, property: 2, work: 1, business: 1, school: 2 },
      age: 21.5,
      dress: { style: "coverall", hair: "bandana", main: "#3f5f8a", accent: "#f2ebe0", hat: "#c8323a",
        name: "Work overalls",
        text: "Factory workers wore overalls and tied up their hair in a bandana, like the famous 'Rosie the Riveter' poster." },
      note: "During the Second World War about six million more women went to work, building ships and planes. 'Rosie the Riveter' became their symbol. When the men came home, many women were pushed out of these jobs.",
      star: { name: "Grace Hopper", text: "Navy officer who in 1944 became one of the first programmers of the Harvard Mark I computer." }
    },
    1965: {
      state: "United States",
      rights: { vote: 2, property: 2, work: 1, business: 1, school: 2 },
      age: 20.6,
      dress: { style: "shift", hair: "bouffant", main: "#5d9fb5", accent: "#f4f1ea",
        name: "Shift dress and bouffant hair",
        text: "Simple A-line dresses in bright colours, with hair backcombed high on top." },
      note: "The Equal Pay Act (1963) and the Civil Rights Act (1964) began to ban unfair treatment at work. But in many places a woman still needed her husband to sign for a credit card or loan, until a law changed that in 1974.",
      star: { name: "Katherine Johnson", text: "NASA mathematician whose calculations helped send John Glenn into orbit around Earth in 1962." }
    },
    1990: {
      state: "United States",
      rights: { vote: 2, property: 2, work: 2, business: 2, school: 2 },
      age: 23.9,
      dress: { style: "jeans", hair: "long", main: "#7b4b9c", accent: "#4d6f9e",
        name: "Jeans and big jackets",
        text: "Denim, sneakers, oversized blazers and big hair." },
      note: "Title IX (1972) made schools treat girls and boys equally, including in sports. A 1988 law ended rules that made women get a male relative to co-sign a business loan. By the 1980s more women than men were earning college degrees.",
      star: { name: "Mae Jemison", text: "Doctor and engineer who in 1992 became the first African American woman in space." }
    },
    2025: {
      state: "United States",
      rights: { vote: 2, property: 2, work: 2, business: 2, school: 2 },
      age: 28.6,
      skin: "#a8724e",
      dress: { style: "suit", hair: "long", main: "#2f6a5b", accent: "#f3efe8", trouser: true,
        name: "Trouser suits and sportswear",
        text: "Women wear whatever suits their day: trouser suits, leggings, jeans or dresses." },
      note: "Women have equal rights by law. More women than men graduate from university, and women own about 4 in 10 American businesses. Women are still less often the bosses of big companies.",
      star: { name: "Kamala Harris", text: "In 2021 she became the first woman Vice President, and the first Black and South Asian American in that role." }
    }
  },

  russia: {
    1850: {
      state: "Russian Empire",
      rights: { vote: 0, property: 1, work: 1, business: 1, school: 0 },
      age: 20,
      dress: { style: "sarafan", hair: "kokoshnik", main: "#b3302c", accent: "#f4ecdc", hat: "#b3302c", trim: "#d9a53a",
        name: "Sarafan and kokoshnik",
        text: "Peasant women wore a sarafan, a long pinafore dress, over a linen blouse. The tall kokoshnik headdress was for holidays. Rich women in the cities wore Paris fashions." },
      note: "Most country people were serfs. They belonged to landowners, women and men alike, until serfdom ended in 1861. Surprisingly, Russian law let a married noblewoman keep her own land and money, which British wives could not. But a wife needed her husband's permission to travel, work or study.",
      star: { name: "Nadezhda Durova", text: "Disguised herself as a man to serve as a cavalry officer in the wars against Napoleon, then wrote a famous book about it." }
    },
    1880: {
      state: "Russian Empire",
      rights: { vote: 0, property: 1, work: 1, business: 1, school: 1 },
      age: 20,
      dress: { style: "sarafan", hair: "kerchief", main: "#3d5a8c", accent: "#f4ecdc", hat: "#d24b3e", trim: "#e2b44a",
        name: "Sarafan and headscarf",
        text: "Married peasant women always covered their hair, usually with a bright printed scarf tied under the chin." },
      note: "Universities would not take women, so many Russian women travelled to Zurich in Switzerland to study medicine. In 1878 the Bestuzhev Courses opened in St Petersburg. They taught at university level but could not give official degrees.",
      star: { name: "Sofia Kovalevskaya", text: "Mathematician who in 1889 became the first woman in northern Europe to be a full university professor (in Stockholm)." }
    },
    1900: {
      state: "Russian Empire",
      rights: { vote: 0, property: 1, work: 1, business: 1, school: 1 },
      age: 21,
      dress: { style: "workdress", hair: "kerchief", main: "#5a4a3e", accent: "#e9e1cf", hat: "#3f6e9a",
        name: "Factory worker's dress",
        text: "A plain long dress, an apron and a headscarf. In the cities, well-off women wore the same fashions as in London or Paris." },
      note: "Millions of peasant women moved to cities to work in textile factories, often for 12 hours a day. Merchant women could run shops and trading firms. Until 1906 nobody, man or woman, could vote for a national parliament, and then only men could.",
      star: { name: "Anna Pavlova", text: "A ballerina from a poor family who became world-famous dancing 'The Dying Swan' (1905)." }
    },
    1925: {
      state: "Soviet Union",
      rights: { vote: 2, property: 2, work: 2, business: 1, school: 2 },
      age: 21.5,
      dress: { style: "shift", hair: "kerchief", main: "#6b6a5c", accent: "#e9e3d3", hat: "#c62f2f",
        name: "The red kerchief",
        text: "A simple dress and a red headscarf became the symbol of the new Soviet working woman." },
      note: "In 1917 Russia became one of the first big countries to give women the vote. The new Soviet state declared women and men equal, opened all universities to women and ran reading classes for women who had never been to school. In the early 1920s people were again allowed small private shops.",
      star: { name: "Alexandra Kollontai", text: "In 1923 she became one of the first women in the world to serve as an ambassador (to Norway)." }
    },
    1945: {
      state: "Soviet Union",
      rights: { vote: 2, property: 2, work: 2, business: 0, school: 2 },
      age: 23,
      dress: { style: "forties", hair: "rolls", main: "#4b5a7c", accent: "#e6dfcc",
        name: "Simple wartime dress",
        text: "Cloth was scarce, so dresses were plain and often re-sewn from old clothes. Hundreds of thousands of women wore army uniform." },
      note: "Around 800,000 women served in the Soviet army in the Second World War, as pilots, medics and radio operators. Women and men both voted, but there was only one party to choose. Private businesses were banned for everyone.",
      star: { name: "Marina Raskova", text: "Pilot and navigator who formed three all-women air regiments, including the 'Night Witches'." }
    },
    1965: {
      state: "Soviet Union",
      rights: { vote: 2, property: 2, work: 2, business: 0, school: 2 },
      age: 22.5,
      dress: { style: "shift", hair: "bouffant", main: "#3c8b86", accent: "#f2eee4",
        name: "Neat knee-length dress",
        text: "Many women sewed their own clothes from patterns printed in magazines like 'Rabotnitsa' (Working Woman)." },
      note: "Most Soviet women worked full time as doctors, engineers, teachers and factory workers. About three in four doctors were women. But they also did almost all the cooking, cleaning and queuing for food at home. People called this the double burden.",
      star: { name: "Valentina Tereshkova", text: "In 1963 she became the first woman in space, orbiting Earth 48 times." }
    },
    1990: {
      state: "Soviet Union",
      rights: { vote: 2, property: 2, work: 2, business: 1, school: 2 },
      age: 22,
      dress: { style: "jeans", hair: "perm", main: "#d9467b", accent: "#4a6aa0",
        name: "Jeans were treasure",
        text: "Imported jeans were hard to find and very expensive, so a pair of real denim was a prized possession." },
      note: "Perestroika brought the first elections with a real choice of candidates (1989) and allowed small private businesses called cooperatives (1988). A list of hundreds of jobs was still closed to women because they were called 'too heavy or dangerous'.",
      star: { name: "Svetlana Savitskaya", text: "In 1984 she became the first woman to walk in space." }
    },
    2025: {
      state: "Russia",
      rights: { vote: 2, property: 2, work: 2, business: 2, school: 2 },
      age: 25,
      dress: { style: "suit", hair: "long", main: "#5a4a7c", accent: "#efebf3", trouser: true,
        name: "Modern city style",
        text: "Coats, trouser suits, jeans and dresses, the same as in any big city in the world." },
      note: "Women have the same legal rights as men, and more women than men have university degrees. In 2021 Russia cut its list of jobs banned to women from 456 to about 100, so women can now drive trains and lorries.",
      star: { name: "Anna Kikina", text: "Engineer and cosmonaut who flew to the International Space Station in 2022." }
    }
  },

  turkey: {
    1850: {
      state: "Ottoman Empire",
      rights: { vote: 0, property: 2, work: 1, business: 1, school: 0 },
      age: 19,
      dress: { style: "ferace", hair: "yasmak", main: "#5f8a5b", accent: "#ffffff",
        name: "Ferace and yaşmak",
        text: "Outdoors, city women wore the ferace, a long coat, and the yaşmak, a thin white veil around the face. At home they wore şalvar (baggy trousers) and a long robe." },
      note: "Islamic law let women own property, keep their marriage gift (mahr) and go to court in their own name, even after marrying. Daughters inherited, but only half as much as sons. Few girls went beyond religious primary school. The first state secondary school for girls opened in 1858.",
      star: { name: "Women founders", text: "Wealthy Ottoman women paid for fountains, schools and mosques by setting up charities (vakıfs) with their own money." }
    },
    1880: {
      state: "Ottoman Empire",
      rights: { vote: 0, property: 2, work: 1, business: 1, school: 0 },
      age: 19,
      dress: { style: "ferace", hair: "yasmak", main: "#8b5b7e", accent: "#ffffff",
        name: "Silk ferace",
        text: "Ferace coats came in bright silks, and in fashionable Istanbul the white veils grew thinner and thinner." },
      note: "A teacher-training college for women opened in Istanbul in 1870, so women could become teachers. Women ran farms, wove carpets and sold goods, though in cities much trade was done through male relatives.",
      star: { name: "Fatma Aliye", text: "Wrote one of the first novels by a woman in the Ottoman Empire (1891) and argued for girls' education." }
    },
    1900: {
      state: "Ottoman Empire",
      rights: { vote: 0, property: 2, work: 1, business: 1, school: 1 },
      age: 20,
      dress: { style: "charshaf", hair: "none", main: "#2b2a36", accent: "#47455a",
        name: "The çarşaf",
        text: "A two-piece cloak, usually black, with a short cape and a face veil. It became the city fashion by 1900." },
      note: "More girls went to school, and women's magazines were printed in Istanbul. Men voted for an Ottoman parliament from 1908, but women could not. A women's university (İnas Darülfünunu) would open in 1914.",
      star: { name: "Halide Edib", text: "Writer who in 1901 became the first Muslim Turkish woman to graduate from the American College for Girls in Istanbul." }
    },
    1925: {
      state: "Republic of Turkey",
      rights: { vote: 0, property: 2, work: 1, business: 1, school: 2 },
      age: 20,
      dress: { style: "shift", hair: "cloche", main: "#7d5a3c", accent: "#efe4cf", hat: "#3b3446",
        name: "European coat and hat",
        text: "In the new Republic, city women began wearing European-style dresses, coats and hats. Village women kept the şalvar and headscarf." },
      note: "The new Republic of Turkey (1923) changed women's lives fast. The 1926 Civil Code banned having more than one wife and gave women equal rights to divorce and to inherit. Universities now taught women and men together. The vote came a few years later.",
      star: { name: "Safiye Ali", text: "In 1922 she became the first Turkish woman doctor." }
    },
    1945: {
      state: "Republic of Turkey",
      rights: { vote: 2, property: 2, work: 1, business: 1, school: 2 },
      age: 20,
      dress: { style: "forties", hair: "rolls", main: "#7c2f3c", accent: "#e8d6b0",
        name: "Tailored 1940s dress",
        text: "Padded shoulders, a belted waist and a knee-length skirt, just like in Europe." },
      note: "Turkish women won the vote in local elections in 1930 and national elections in 1934, earlier than women in France or Italy. In 1935, 18 women were elected to parliament. But a husband could still legally stop his wife from taking a job.",
      star: { name: "Sabiha Gökçen", text: "In 1937 she became the world's first woman combat pilot." }
    },
    1965: {
      state: "Republic of Turkey",
      rights: { vote: 2, property: 2, work: 1, business: 1, school: 2 },
      age: 20.5,
      dress: { style: "shift", hair: "bouffant", main: "#d1a14a", accent: "#fbf6ea",
        name: "Shift dress",
        text: "In Istanbul and Ankara women wore the same short, bright dresses as in London." },
      note: "City women worked as teachers, doctors, lawyers, judges and professors. In villages, many girls still left school early to help at home, and the law still let a husband stop his wife from working.",
      star: { name: "Leyla Gencer", text: "Opera singer who starred at La Scala in Milan and was called 'La Diva Turca'." }
    },
    1990: {
      state: "Republic of Turkey",
      rights: { vote: 2, property: 2, work: 2, business: 2, school: 2 },
      age: 22,
      dress: { style: "suit", hair: "long", main: "#336c7c", accent: "#f2eee6",
        name: "Office suit",
        text: "Shoulder-padded jackets and skirts for work, jeans for the weekend." },
      note: "In 1990 Turkey's Constitutional Court struck down the rule that a wife needed her husband's permission to work. Women's groups campaigned for equal laws and against violence at home.",
      star: { name: "Tansu Çiller", text: "Economics professor who in 1993 became Turkey's first woman Prime Minister." }
    },
    2025: {
      state: "Turkey",
      rights: { vote: 2, property: 2, work: 2, business: 2, school: 2 },
      age: 25.5,
      dress: { style: "tunic", hair: "hijab", main: "#b65c6f", accent: "#4b4560", hat: "#4f6a9a",
        name: "Many styles",
        text: "Some women cover their hair with a headscarf and others don't. Both are common in universities, offices and parliament." },
      note: "Since the 2001 Civil Code, husband and wife are equal partners; the husband is no longer the legal 'head of the family'. Girls and boys now go to school at almost the same rates, but far fewer women than men have paid jobs.",
      star: { name: "The 'Sultans of the Net'", text: "Turkey's women's volleyball team won both the European Championship and the Nations League in 2023." }
    }
  },

  china: {
    1850: {
      state: "Qing Empire",
      rights: { vote: 0, property: 0, work: 1, business: 1, school: 0 },
      age: 17.5,
      dress: { style: "aoqun", hair: "bun", main: "#2f5c8c", accent: "#c94a3a", trim: "#e7c46a", bound: true,
        name: "Jacket and skirt (ao qun)",
        text: "Han Chinese women wore a wide-sleeved jacket over a pleated skirt. Many girls had their feet tightly bound to keep them tiny, which was painful and made walking hard." },
      note: "By old custom a woman obeyed her father, then her husband, then her son. Daughters usually could not inherit land, and nobody, man or woman, voted for the emperor's government. During the Taiping Rebellion (1850–64) some women even fought as soldiers.",
      star: { name: "Silk and cotton weavers", text: "Women spun and wove at home, and their cloth often paid a big part of the family's taxes." }
    },
    1880: {
      state: "Qing Empire",
      rights: { vote: 0, property: 0, work: 1, business: 1, school: 0 },
      age: 17.5,
      dress: { style: "aoqun", hair: "bun", main: "#8b3a5c", accent: "#2f4c6e", trim: "#e7c46a", bound: true,
        name: "Embroidered jacket",
        text: "Jackets had wide embroidered borders. Manchu women did not bind their feet and wore long straight robes instead." },
      note: "Christian missionaries opened some of the first girls' schools (the first in 1844, in Ningbo). Most girls only learned at home, and parents arranged marriages. Often the bride and groom met for the first time on their wedding day.",
      star: { name: "Jin Yunmei", text: "In 1885 she became the first Chinese woman to earn a medical degree, in New York." }
    },
    1900: {
      state: "Qing Empire",
      rights: { vote: 0, property: 0, work: 1, business: 1, school: 0 },
      age: 17.5,
      dress: { style: "aoqun", hair: "bun", main: "#3a7a6a", accent: "#3b2d44", trim: "#efd27a", bound: true,
        name: "Jacket and skirt",
        text: "Clothes changed slowly, but anti-foot-binding societies were persuading families to stop binding their daughters' feet." },
      note: "Reformers campaigned against foot-binding from the 1890s. In 1898 Chinese reformers opened the first Chinese-run girls' school in Shanghai, and in 1907 the Qing government allowed girls' schools across the country.",
      star: { name: "Qiu Jin", text: "Poet who unbound her feet, studied in Japan and in 1907 founded the Chinese Women's Journal to call for women's rights." }
    },
    1925: {
      state: "Republic of China",
      rights: { vote: 0, property: 1, work: 1, business: 1, school: 1 },
      age: 18,
      dress: { style: "qipao", hair: "bob", main: "#4a6b9c", accent: "#e8dcc2", len: 168,
        name: "Early qipao",
        text: "The qipao began in the 1920s as a loose, straight robe. Girl students wore it with short hair and natural, unbound feet." },
      note: "The Republic of China (1912) banned foot-binding. After the May Fourth movement of 1919, young women demanded education and the right to choose their own husbands. Peking University admitted its first women students in 1920.",
      star: { name: "Lin Huiyin", text: "Studied architecture in the USA (1924–27) and became one of China's first women architects." }
    },
    1945: {
      state: "Republic of China",
      rights: { vote: 1, property: 1, work: 1, business: 1, school: 1 },
      age: 18.5,
      dress: { style: "qipao", hair: "rolls", main: "#a8323f", accent: "#efd58c", fit: true, len: 186,
        name: "Fitted qipao",
        text: "By the 1930s and 40s the qipao was slim-fitting with a high collar, often worn with short sleeves and high heels in Shanghai." },
      note: "A 1930 law gave daughters the right to inherit and wives the right to divorce, but in villages old customs often won. Women nursed soldiers, ran schools and worked in factories during the war with Japan (1937–45). Women got the vote in the 1947 constitution.",
      star: { name: "Lin Qiaozhi", text: "Doctor who delivered over 50,000 babies and became a pioneer of women's health in China." }
    },
    1965: {
      state: "People's Republic of China",
      rights: { vote: 2, property: 2, work: 2, business: 0, school: 2 },
      age: 20,
      dress: { style: "maosuit", hair: "plaits", main: "#4b5c70", accent: "#c8323a",
        name: "Jacket and trousers",
        text: "Simple blue or grey jackets and trousers, the same for women and men. Girls often wore their hair in two plaits." },
      note: "The 1950 Marriage Law banned arranged marriages and child marriages and let women ask for divorce. Mao Zedong's slogan was 'Women hold up half the sky', and most women worked outside the home. Private businesses were banned for everyone, and there was only one party to vote for.",
      star: { name: "Tu Youyou", text: "Scientist who in 1969 began searching ancient medicine books for a malaria cure. Her discovery saved millions of lives and won a Nobel Prize in 2015." }
    },
    1990: {
      state: "People's Republic of China",
      rights: { vote: 2, property: 2, work: 2, business: 2, school: 2 },
      age: 22,
      dress: { style: "jeans", hair: "perm", main: "#e2663b", accent: "#3f5f8f",
        name: "Bright colours return",
        text: "After years of blue and grey, people wore colourful jackets, jeans and permed hair." },
      note: "Economic reforms from 1978 let people start private businesses again, and many women opened shops and factories. The 1992 Women's Rights Law promised equal rights in work, property and education.",
      star: { name: "Deng Yaping", text: "Table-tennis champion who won four Olympic gold medals (1992 and 1996)." }
    },
    2025: {
      state: "People's Republic of China",
      rights: { vote: 2, property: 2, work: 2, business: 2, school: 2 },
      age: 28,
      dress: { style: "jeans", hair: "long", main: "#f0f0ee", accent: "#2f3d5c",
        name: "Global fashion",
        text: "Jeans and trainers, office wear, and for some young people a fun revival of 'hanfu', clothes inspired by ancient Chinese dress." },
      note: "More women than men now study at university, and China has more self-made women billionaires than any other country. Women still face unfair questions at job interviews, such as when they plan to marry or have children.",
      star: { name: "Wang Yaping", text: "Astronaut who in 2021 became the first Chinese woman to walk in space." }
    }
  }
};

// ---------- Schooling, literacy, jobs, children and pay ----------
// read:  approximate % of adult women who could read and write
// kids:  average number of children a woman had (total fertility rate)
// pay:   roughly how much a woman earned for every 100 a man earned (null = no reliable figure)
// Older figures are rough estimates from historians and should be read as "about".
const EXTRA = {
  uk: {
    1850: { read: 55, kids: 4.7, pay: 50,
      school: "There were no free state schools yet. Poorer girls went to Sunday schools, church schools or 'dame schools' run by a woman in her home. Rich girls were taught by a governess.",
      jobs: ["Domestic servant", "Cotton mill worker", "Dressmaker", "Farm worker", "Lodging-house keeper"],
      payNote: "Women were usually paid about half of a man's wage, even for the same work." },
    1880: { read: 82, kids: 4.8, pay: 50,
      school: "From 1880 school was compulsory for all children aged 5 to 10. Girls learned reading, writing and arithmetic, plus needlework and cooking.",
      jobs: ["Domestic servant", "Textile worker", "Dressmaker", "Teacher", "Laundress"],
      payNote: "A woman teacher earned much less than a man teacher in the same school." },
    1900: { read: 97, kids: 3.5, pay: 50,
      school: "Primary school became free in 1891. New girls' high schools taught Latin, science and maths, not just 'ladylike' subjects.",
      jobs: ["Domestic servant", "Textile worker", "Shop assistant", "Teacher", "Typist"],
      payNote: "Office jobs like typing paid better than service, but still far less than men's office jobs." },
    1925: { read: 99, kids: 2.2, pay: 50,
      school: "Since 1918 everyone had to stay at school until 14. Scholarships let some clever working-class girls go to grammar school.",
      jobs: ["Clerk and typist", "Shop assistant", "Domestic servant", "Factory worker", "Teacher"],
      payNote: "Pay scales for teachers and civil servants were officially lower for women." },
    1945: { read: 99, kids: 2.1, pay: 55,
      school: "The 1944 Education Act made secondary school free for every child, to age 15 from 1947.",
      jobs: ["Factory worker", "Land Girl (farm work)", "Nurse", "Clerk", "Women's army or air force"],
      payNote: "Even in war factories, women usually earned only about half to two-thirds of men's pay." },
    1965: { read: 99, kids: 2.9, pay: 60,
      school: "Most girls left school at 15 or 16. Only a small share went to university, but the numbers were rising fast.",
      jobs: ["Secretary", "Shop assistant", "Nurse", "Teacher", "Factory worker"],
      payNote: "In 1968 women sewing machinists at the Ford factory in Dagenham went on strike for equal pay. Their strike led to the Equal Pay Act of 1970." },
    1990: { read: 99, kids: 1.8, pay: 77,
      school: "Everyone stayed at school until 16. Girls began to do better than boys in exams.",
      jobs: ["Office worker", "Shop worker", "Nurse", "Teacher", "Care worker"],
      payNote: "Equal pay was the law, but jobs mostly done by women were often paid less." },
    2025: { read: 99, kids: 1.4, pay: 93,
      school: "Young people stay in education or training until 18. On average girls get better exam results than boys.",
      jobs: ["Nurse or care worker", "Teacher or teaching assistant", "Office manager", "Shop worker", "Own business: beauty, online shops, consulting"],
      payNote: "The gap is small for full-time workers in their 20s, but it grows after women have children." }
  },
  usa: {
    1850: { read: 75, kids: 5.4, pay: 45,
      school: "Free 'common schools' spread in the North and many girls went to them. In the South it was against the law to teach enslaved people to read.",
      jobs: ["Farm work", "Domestic servant", "Textile mill worker", "Seamstress", "Teacher"],
      payNote: "The 'Lowell mill girls' of Massachusetts earned wages of their own, but only about half of what men earned." },
    1880: { read: 80, kids: 4.2, pay: 50,
      school: "Most children in the North went to free primary school. After 1865, schools for Black children opened in the South, often run by Black women teachers.",
      jobs: ["Domestic servant", "Farm work", "Teacher", "Dressmaker", "Laundress"],
      payNote: "Teaching was one of the few respectable jobs for women, partly because schools could pay women less." },
    1900: { read: 89, kids: 3.6, pay: 55,
      school: "More girls than boys finished high school, because boys often left early to earn money.",
      jobs: ["Domestic servant", "Farm worker", "Dressmaker", "Teacher", "Factory worker"],
      payNote: "Women usually earned a little over half of what men earned." },
    1925: { read: 94, kids: 2.9, pay: 57,
      school: "Most states made children stay in school until about 16, and high school was becoming normal.",
      jobs: ["Typist and clerk", "Teacher", "Telephone operator", "Factory worker", "Shop assistant"],
      payNote: "Telephone operator and typist were new 'women's jobs': clean and respectable, but lower paid." },
    1945: { read: 97, kids: 2.4, pay: 60,
      school: "About half of young people finished high school. During the war, girls trained for factory and office jobs.",
      jobs: ["Factory worker (ships and planes)", "Office clerk", "Nurse", "Teacher", "Shop assistant"],
      payNote: "War factories paid women far more than they had earned before, but still less than men." },
    1965: { read: 99, kids: 2.9, pay: 59,
      school: "Most girls finished high school. Colleges were opening their doors wider to women.",
      jobs: ["Secretary", "Teacher", "Nurse", "Shop assistant", "Waitress"],
      payNote: "Around 1963, women earned about 59 cents for every dollar men earned. Campaigners wore '59¢' badges in protest." },
    1990: { read: 99, kids: 2.1, pay: 72,
      school: "Girls and boys were in school equally, and Title IX protected girls' sports teams.",
      jobs: ["Secretary", "Cashier", "Teacher", "Nurse", "Bookkeeper"],
      payNote: "Women earned about 72 cents for every dollar men earned." },
    2025: { read: 99, kids: 1.6, pay: 83,
      school: "Girls are more likely than boys to finish college.",
      jobs: ["Registered nurse", "Teacher", "Home health aide", "Office manager", "Own business: health, beauty, consulting"],
      payNote: "Women earn about 83 cents for every dollar men earn. The gap is bigger for Black and Hispanic women." }
  },
  russia: {
    1850: { read: 6, kids: 7, pay: null,
      school: "There were almost no village schools. Noble girls went to boarding 'institutes' like the Smolny Institute in St Petersburg to learn French, dancing and good manners.",
      jobs: ["Farm work (as serfs)", "Spinning and weaving at home", "Servant", "Wet nurse", "Merchant's shop"],
      payNote: "Most women were serfs who worked for their landowner and family without wages." },
    1880: { read: 9, kids: 7, pay: 55,
      school: "Girls' gymnasia (secondary schools) opened in cities from 1858. A village girl might attend a church school for a year or two.",
      jobs: ["Farm work", "Weaving at home", "Servant", "Textile factory worker", "Midwife"],
      payNote: "Women factory workers earned roughly half to two-thirds of men's pay." },
    1900: { read: 13, kids: 7, pay: 55,
      school: "In the 1897 census only about 1 in 8 women could read. Village schools run by local councils were spreading, but boys outnumbered girls three to one.",
      jobs: ["Textile factory worker", "Servant", "Farm work", "Village teacher", "Seamstress"],
      payNote: "Women were hired in textile mills partly because owners could pay them less." },
    1925: { read: 43, kids: 6.5, pay: 65,
      school: "The 'Likbez' campaign taught millions of adults to read, most of them women. Village 'reading huts' had books and newspapers.",
      jobs: ["Factory worker", "Farm work", "Teacher", "Office worker", "Nurse"],
      payNote: "The law said equal pay for equal work, but women had the lower-paid jobs." },
    1945: { read: 85, kids: 2.5, pay: 65,
      school: "From 1943 to 1954, city schools taught girls and boys separately. Almost every young woman could now read.",
      jobs: ["Factory worker", "Tractor driver on a collective farm", "Army medic", "Teacher", "Railway worker"],
      payNote: "With most men at the front, women did the heaviest work for very little pay." },
    1965: { read: 98, kids: 2.1, pay: 70,
      school: "Eight years of school were compulsory. Girls studied maths and science just like boys, and many became engineers.",
      jobs: ["Doctor", "Teacher", "Engineer", "Factory worker", "Shop assistant"],
      payNote: "Jobs filled mostly by women, such as doctor and teacher, paid less than jobs in heavy industry." },
    1990: { read: 99, kids: 1.9, pay: 70,
      school: "Ten years of school was normal, and girls often got better marks than boys.",
      jobs: ["Teacher", "Doctor", "Engineer", "Accountant", "Own business: small cooperatives, 'shuttle' traders"],
      payNote: "Women earned about 70 kopeks for every rouble men earned." },
    2025: { read: 99, kids: 1.4, pay: 72,
      school: "School lasts 11 years, and more women than men go to university.",
      jobs: ["Teacher", "Doctor or nurse", "Accountant", "Sales and services", "Own business: retail, beauty, online"],
      payNote: "Women earn roughly 70–75% of men's average pay." }
  },
  turkey: {
    1850: { read: 2, kids: 6, pay: null,
      school: "Some girls attended the neighbourhood primary school (sıbyan mektebi) to learn the Qur'an and a little reading. The first girls' middle school (rüşdiye) opened in Istanbul in 1858.",
      jobs: ["Farm work", "Carpet and textile weaving at home", "Embroidery", "Servant", "Midwife"],
      payNote: "Most women worked on family farms or at home without wages, so there are no good figures." },
    1880: { read: 3, kids: 6, pay: null,
      school: "Girls' middle schools spread in cities, and from 1870 young women could train as teachers.",
      jobs: ["Farm work", "Carpet weaving", "Silk spinning", "Teacher", "Dressmaker"],
      payNote: "No reliable figures. Girls who wove carpets in workshops were paid very little." },
    1900: { read: 4, kids: 6, pay: null,
      school: "Missionary and community schools taught many Christian and Jewish girls, but most Muslim village girls never went to school.",
      jobs: ["Farm work", "Carpet weaving", "Silk mill worker (Bursa)", "Teacher", "Seamstress"],
      payNote: "No reliable figures. Bursa's silk mills hired many girls at low wages." },
    1925: { read: 5, kids: 6, pay: null,
      school: "The Republic made primary school free and compulsory for girls and boys. In 1928 Turkey switched to the Latin alphabet, and 'Nation's Schools' taught adults to read.",
      jobs: ["Farm work", "Teacher", "Tobacco factory worker", "Nurse", "Dressmaker"],
      payNote: "No reliable figures. Most women still worked on family farms without wages." },
    1945: { read: 17, kids: 6.5, pay: null,
      school: "From 1940 'Village Institutes' trained village boys and girls to go back and teach in their own villages.",
      jobs: ["Farm work", "Teacher", "Tobacco and textile factory worker", "Nurse", "Office clerk"],
      payNote: "No reliable figures. Women in state jobs such as teaching were paid on the same scale as men." },
    1965: { read: 33, kids: 5.7, pay: null,
      school: "Most city girls finished primary school, but in villages many girls left early or never started.",
      jobs: ["Farm work", "Teacher", "Factory worker", "Secretary", "Doctor or lawyer (in cities)"],
      payNote: "No reliable national figures. Most women's work on farms was still unpaid." },
    1990: { read: 72, kids: 3, pay: null,
      school: "Five years of school were compulsory, and many village girls stopped there.",
      jobs: ["Farm work", "Teacher", "Textile factory worker", "Office worker", "Nurse"],
      payNote: "No reliable national figures. Many women worked in family businesses without their own wage." },
    2025: { read: 95, kids: 1.5, pay: 88,
      school: "Twelve years of school have been compulsory since 2012, and almost as many girls as boys now go to school.",
      jobs: ["Services and shops", "Teacher", "Nurse or doctor", "Textile worker", "Own business: food, crafts, online shops"],
      payNote: "Women who have a paid job earn roughly 85–90% of what men earn, but far fewer women have paid jobs." }
  },
  china: {
    1850: { read: 5, kids: 5.5, pay: null,
      school: "A few girls from rich families learned to read at home from books written to teach girls 'proper behaviour'. Most girls never learned to read.",
      jobs: ["Farm work", "Spinning and weaving", "Raising silkworms", "Embroidery", "Servant"],
      payNote: "Women's work at home was not paid as a wage, so there are no figures." },
    1880: { read: 5, kids: 5.5, pay: null,
      school: "Missionary girls' schools taught a few thousand girls. Some asked families to unbind their daughters' feet.",
      jobs: ["Farm work", "Spinning and weaving", "Silk reeling (new Shanghai mills)", "Embroidery", "Servant"],
      payNote: "No reliable figures. The first silk mills in Shanghai paid girls very low wages." },
    1900: { read: 5, kids: 5.5, pay: null,
      school: "The first Chinese-run girls' school opened in Shanghai in 1898, teaching reading, maths and sewing.",
      jobs: ["Silk and cotton mill worker", "Farm work", "Weaving at home", "Servant", "Midwife"],
      payNote: "No reliable figures. Girls in Shanghai mills often worked 12-hour shifts." },
    1925: { read: 8, kids: 5.5, pay: null,
      school: "Girls' primary and middle schools spread in the cities, but most village girls still did not go to school.",
      jobs: ["Cotton mill worker (Shanghai)", "Farm work", "Teacher", "Nurse", "Servant"],
      payNote: "No reliable national figures. Women in cotton mills were paid less than men in the same mills." },
    1945: { read: 10, kids: 5.5, pay: null,
      school: "War closed many schools. 'Mass education' campaigns ran evening classes to teach adults to read.",
      jobs: ["Farm work", "Mill worker", "Nurse", "Teacher", "Small trader"],
      payNote: "No reliable figures." },
    1965: { read: 30, kids: 6.1, pay: 75,
      school: "Simplified characters (from 1956) and evening literacy classes helped millions of women learn to read.",
      jobs: ["Commune farm worker", "Factory worker", "Teacher", "'Barefoot doctor' (village health worker)", "Shop worker"],
      payNote: "In village communes, women usually earned 7 or 8 'work points' a day while men earned 10." },
    1990: { read: 68, kids: 2.3, pay: 78,
      school: "Nine years of school became compulsory in 1986, but some village girls still left early to work.",
      jobs: ["Export factory worker", "Farm work", "Teacher", "Shop owner or street trader", "Office worker"],
      payNote: "In cities, women earned roughly three-quarters of what men earned." },
    2025: { read: 95, kids: 1, pay: 75,
      school: "Girls and boys go to school equally, and more women than men study at university.",
      jobs: ["Factory worker", "Sales and services", "Teacher", "Office worker", "Own business: online shops, livestream selling"],
      payNote: "Studies estimate women earn roughly 70–80% of what men earn." }
  }
};
for (const c in EXTRA) for (const y in EXTRA[c]) Object.assign(DATA[c][y], EXTRA[c][y]);

// ---------- Working or at home? ----------
// work: approx. % of working-age women counted as working (a paid job, or work
// counted by the census on a family farm or business). null = no reliable figure.
// Old censuses often missed farm wives and women helping in family shops,
// so early numbers are too low rather than too high.
const WORKFORCE = {
  uk: {
    1850: [35, "Mostly servants, mill workers and dressmakers. Middle-class wives were expected to stay at home."],
    1880: [34, "A 'respectable' wife stayed home. Many poorer wives took in washing or sewing, which censuses rarely counted."],
    1900: [32, "Most women stopped working when they married. Only about 1 in 10 wives had a recorded job."],
    1925: [34, "Many young single women worked in offices and shops, then left at marriage."],
    1945: [45, "During the war, women were called up for war work, and many more had jobs than ever before."],
    1965: [47, "More married women were going back to work, often part time once their children were at school."],
    1990: [66, "Two in three women of working age had a job, many of them part time."],
    2025: [75, "Three in four women of working age work, almost as many as men."]
  },
  usa: {
    1850: [15, "Most women worked hard on family farms, but censuses didn't count that. Enslaved women were forced to work and were not counted either."],
    1880: [15, "Paid work was mostly for young single women, widows and poorer families."],
    1900: [21, "About 1 in 5 women had a paid job, but only about 1 in 20 married white women did. Black women were far more likely to work for wages."],
    1925: [24, "Young single women worked in offices and shops. Most left when they married."],
    1945: [37, "War work drew millions of women into jobs. Many were pushed out again when the war ended."],
    1965: [44, "Many married women returned to work once their children were older."],
    1990: [67, "Two-paycheck families became normal."],
    2025: [69, "About 7 in 10 women of working age have or are looking for a job."]
  },
  russia: {
    1850: [null, "Almost every peasant woman worked on the family farm and spun and wove at home, but there are no counts of this work."],
    1880: [null, "Nearly all village women did farm work. Only a small number worked for wages in factories or as servants."],
    1900: [null, "Women did most of the farm work, and about 1 in 4 factory workers was a woman, but there is no reliable overall figure."],
    1925: [null, "Women were encouraged to work, but jobs were scarce, so many were unemployed in the early 1920s."],
    1945: [null, "With millions of men at war, women made up more than half of all workers."],
    1965: [80, "Almost every woman worked full time. Staying at home was rare and often frowned on."],
    1990: [80, "Most women worked full time and still did nearly all the housework."],
    2025: [70, "About 7 in 10 women of working age have a job."]
  },
  turkey: {
    1850: [null, "Village women worked in the fields and wove at home. City women from well-off families rarely worked outside the home."],
    1880: [null, "Most women worked on family farms. No one counted it as a job."],
    1900: [null, "Women worked on farms, in carpet workshops and in silk mills, but there are no reliable totals."],
    1925: [null, "Most women still worked on family farms. Few had paid jobs in towns."],
    1945: [null, "The large majority of working women were unpaid helpers on family farms."],
    1965: [55, "This number is high because the census counted women working unpaid on family farms."],
    1990: [36, "As families moved from villages to cities, many women stopped farm work and stayed at home."],
    2025: [38, "Only about 4 in 10 women of working age are in the workforce, one of the lowest shares in Europe."]
  },
  china: {
    1850: [null, "Women spun, wove and raised silkworms at home, and in the south many worked in the fields, but nobody counted it."],
    1880: [null, "Women's work at home helped feed the family, but there are no figures."],
    1900: [null, "Girls began working in city silk and cotton mills, but most women worked at home or on the farm."],
    1925: [null, "In Shanghai, about two in three cotton-mill workers were women, but there are no national figures."],
    1945: [null, "War disrupted everything, and there are no reliable figures."],
    1965: [70, "In the communes almost every woman worked in the fields, and city women were assigned jobs by the state."],
    1990: [80, "Most women worked, in fields, factories and offices."],
    2025: [68, "Fewer women work than in 1990, partly because more young women are studying and some cities have fewer jobs for women."]
  }
};
for (const c in WORKFORCE) for (const y in WORKFORCE[c]) {
  DATA[c][y].work = WORKFORCE[c][y][0];
  DATA[c][y].workNote = WORKFORCE[c][y][1];
}

// ---------- Divorce ----------
// [level, note]: could a wife ask for a divorce on the same terms as her husband?
const DIVORCE = {
  uk: {
    1850: [0, "Divorce needed a special Act of Parliament. Only a handful of women in history ever managed it."],
    1880: [1, "Since 1857 courts could grant divorces. A husband only had to prove his wife was unfaithful; a wife had to prove that plus something worse, like cruelty."],
    1900: [1, "The rules were still unequal, and divorce was very expensive."],
    1925: [2, "From 1923 wives could divorce on the same grounds as husbands, though it was still costly and seen as shameful."],
    1945: [2, "Since 1937 a wife could also divorce a husband who had left her or treated her cruelly."],
    1965: [2, "Divorce was possible, but someone had to be proved 'at fault'."],
    1990: [2, "Since 1969 a marriage could end if it had 'broken down', even if nobody was at fault."],
    2025: [2, "Since 2022 either partner can end a marriage without blaming the other."]
  },
  usa: {
    1850: [1, "Each state had its own rules. Some allowed divorce for cruelty or desertion; South Carolina allowed no divorce at all."],
    1880: [1, "By now wives asked for most divorces, usually because of desertion or cruelty, but rules varied by state."],
    1900: [1, "Some states made divorce hard, so some people moved to states like Nevada with easier rules."],
    1925: [1, "Rules still varied by state, and in South Carolina divorce was banned until 1949."],
    1945: [1, "Divorce was possible in most states but needed proof that one partner was 'at fault'."],
    1965: [2, "Wives and husbands had the same rights, but a court had to find someone at fault."],
    1990: [2, "From 1969, starting in California, 'no-fault' divorce spread to almost every state."],
    2025: [2, "Either partner can ask for a divorce."]
  },
  russia: {
    1850: [0, "Only the Church could end a marriage, and it almost never did. A wife could not even live apart without her husband's permission."],
    1880: [0, "Divorce was still almost impossible. A wife needed her husband's permission to get her own passport."],
    1900: [0, "Church divorce was rare. From 1914 a wife could at least get her own passport and live apart."],
    1925: [2, "After 1917 either partner could divorce quickly. From 1926 one partner simply had to register it."],
    1945: [1, "A 1944 law made divorce slow and expensive, with court hearings and a notice in the newspaper."],
    1965: [2, "From 1965 divorce became simple again."],
    1990: [2, "Divorce was easy and common."],
    2025: [2, "Either partner can ask for a divorce. Couples without children can divorce at the registry office."]
  },
  turkey: {
    1850: [1, "A husband could divorce his wife just by saying so. A wife had to go to a judge with a good reason, or give up her marriage gift to be released."],
    1880: [1, "The rules were the same: easy for husbands, harder for wives."],
    1900: [1, "In 1917 a new family law would give wives more reasons they could use to ask a court for divorce."],
    1925: [2, "The 1926 Civil Code gave wives and husbands equal rights to divorce through the courts."],
    1945: [2, "Wives and husbands had equal rights to divorce."],
    1965: [2, "Wives and husbands had equal rights to divorce."],
    1990: [2, "Wives and husbands had equal rights to divorce."],
    2025: [2, "Either partner can ask for a divorce, and couples can agree to divorce together."]
  },
  china: {
    1850: [0, "A husband could send his wife away for 'seven reasons', including talking too much. A wife could almost never leave."],
    1880: [0, "A wife had almost no way to end a marriage."],
    1900: [0, "A wife had almost no way to end a marriage."],
    1925: [1, "Courts of the new Republic began to let some women divorce, and the 1930 Civil Code made the rules equal."],
    1945: [1, "The law was equal, but in villages families often stopped women from leaving."],
    1965: [2, "The 1950 Marriage Law let women ask for divorce, and over a million marriages ended in the next few years."],
    1990: [2, "Either partner could ask for a divorce."],
    2025: [2, "Either partner can ask for a divorce. Since 2021 couples must wait 30 days to 'cool off' first."]
  }
};
RIGHTS.push({ key: "divorce", label: "Ask for a divorce" });
for (const c in DIVORCE) for (const y in DIVORCE[c]) {
  DATA[c][y].rights.divorce = DIVORCE[c][y][0];
  DATA[c][y].divorceNote = DIVORCE[c][y][1];
}

// ---------- Could she be a…? ----------
// [writer, artist, doctor, surgeon, "Did you know?" fact]  0 = No, 1 = Rarely / against the odds, 2 = Yes
const CAREERS = [
  { key: "writer", label: "Writer" },
  { key: "artist", label: "Artist" },
  { key: "doctor", label: "Doctor" },
  { key: "surgeon", label: "Surgeon" }
];
const CAREER_LEVELS = ["No", "Rarely", "Yes"];
const PROFESSIONS = {
  uk: {
    1850: [1, 1, 0, 0, "The Brontë sisters published their famous novels in 1847 under men's names (Currer, Ellis and Acton Bell) so critics would take them seriously."],
    1880: [1, 1, 1, 0, "The novelist 'George Eliot', author of Middlemarch, was really a woman called Mary Ann Evans."],
    1900: [2, 1, 1, 1, "In 1911 Eleanor Davies-Colley became the first woman to join the Royal College of Surgeons."],
    1925: [2, 2, 2, 1, "Two women helped found the Royal Academy of Arts in 1768, but no other woman joined it until Annie Swynnerton in 1922."],
    1945: [2, 2, 2, 1, "Agatha Christie was writing her detective stories. Her books have sold over 2 billion copies, more than any other novelist."],
    1965: [2, 2, 2, 1, "In 1964 Dorothy Hodgkin became the first British woman to win a Nobel Prize in science, for working out the shapes of molecules like penicillin."],
    1990: [2, 2, 2, 2, "J. K. Rowling began writing Harry Potter in 1990. Her publisher suggested using initials so that boys would not be put off by a woman's name."],
    2025: [2, 2, 2, 2, "More than half of new doctors in the UK are women."]
  },
  usa: {
    1850: [2, 1, 1, 0, "In 1849 Elizabeth Blackwell became the first woman in the US to earn a medical degree. The male students had voted to admit her, thinking it was a joke."],
    1880: [2, 1, 1, 1, "Mary Edwards Walker worked as a surgeon in the Civil War. She is still the only woman ever awarded the Medal of Honor."],
    1900: [2, 2, 1, 1, "The painter Mary Cassatt moved to Paris and showed her pictures with the famous Impressionists."],
    1925: [2, 2, 1, 1, "Many medical schools let in only about 5 women for every 100 students."],
    1945: [2, 2, 1, 1, "In 1946 Georgia O'Keeffe became the first woman given a solo exhibition of her life's work at the Museum of Modern Art in New York."],
    1965: [2, 2, 1, 1, "Only about 7 in every 100 American doctors were women."],
    1990: [2, 2, 2, 2, "In 1993 Toni Morrison became the first Black woman to win the Nobel Prize in Literature."],
    2025: [2, 2, 2, 2, "More than half of America's medical students are women."]
  },
  russia: {
    1850: [1, 1, 0, 0, "Women could not study at the Imperial Academy of Arts. They were only allowed to attend classes from 1871."],
    1880: [2, 1, 1, 0, "Women's Medical Courses opened in St Petersburg in 1872, and their students cared for wounded soldiers in the war of 1877–78."],
    1900: [2, 2, 1, 1, "Vera Gedroits was one of the first women army surgeons in the world. She operated on soldiers in the 1904–05 war with Japan."],
    1925: [2, 2, 2, 2, "Painter Zinaida Serebriakova's cheerful self-portrait 'At the Dressing Table' (1909) hangs in Moscow's Tretyakov Gallery."],
    1945: [2, 2, 2, 2, "Thousands of women doctors and surgeons worked in field hospitals just behind the front line."],
    1965: [2, 2, 2, 2, "Anna Akhmatova, one of Russia's greatest poets, was nominated for the Nobel Prize in Literature in 1965."],
    1990: [2, 2, 2, 2, "In the 1990s women such as Alexandra Marinina became Russia's best-selling detective writers."],
    2025: [2, 2, 2, 2, "About 7 in 10 doctors in Russia are women."]
  },
  turkey: {
    1850: [1, 0, 0, 0, "Women poets like Leyla Hanım (died 1847) wrote elegant poetry in the classical Ottoman 'Divan' style."],
    1880: [1, 0, 0, 0, "The Ottoman Fine Arts School opened in 1882, but only for men. Girls could only learn painting at home from private tutors."],
    1900: [1, 1, 0, 0, "Women could not study medicine in the empire, so most women patients were cared for by midwives and women healers."],
    1925: [2, 2, 1, 0, "The painter Mihri Müşfik was the first head of the Fine Arts School for Women, which opened in Istanbul in 1914."],
    1945: [2, 2, 2, 1, "Istanbul University's medical school first accepted women in 1922, and by the 1940s Turkey had hundreds of women doctors."],
    1965: [2, 2, 2, 1, "Painter Fahrelnissa Zeid made huge, colourful abstract paintings that were shown in Paris, London and New York."],
    1990: [2, 2, 2, 2, "Doctor Türkan Saylan fought leprosy and in 1989 set up a group that has helped thousands of girls stay in school."],
    2025: [2, 2, 2, 2, "Almost half of Turkey's university lecturers are women."]
  },
  china: {
    1850: [1, 1, 0, 0, "Some women from educated families were admired poets and painters, like the poet Gu Taiqing (1799–1877)."],
    1880: [1, 1, 1, 0, "Women were not allowed to perform in Peking opera, so men played all the female roles."],
    1900: [1, 1, 1, 0, "In 1896 Kang Cheng and Shi Meiyu graduated as doctors in the USA and came home to open hospitals for women and children."],
    1925: [2, 1, 1, 1, "Pan Yuliang studied painting in France and Italy, then came home to teach art in Shanghai."],
    1945: [2, 2, 1, 1, "Writer Eileen Chang became a star in Shanghai with the short stories she published in 1943–44."],
    1965: [2, 2, 2, 2, "Liang Jun became China's first woman tractor driver in 1948. A picture of her was printed on the 1-yuan banknote."],
    1990: [2, 2, 2, 2, "Actress Gong Li became a world-famous film star after the film 'Red Sorghum' (1987)."],
    2025: [2, 2, 2, 2, "About half of China's doctors are women."]
  }
};
for (const c in PROFESSIONS) for (const y in PROFESSIONS[c]) {
  const p = PROFESSIONS[c][y];
  DATA[c][y].careers = { writer: p[0], artist: p[1], doctor: p[2], surgeon: p[3] };
  DATA[c][y].fact = p[4];
}

// ---------- Running a business ----------
const BUSINESS = {
  uk: {
    1850: "Single women and widows could run shops, inns and lodging houses. A married woman's business legally belonged to her husband.",
    1880: "Since 1870 a wife could keep her own earnings, but until 1882 her husband still controlled her property.",
    1900: "Wives could now own a business, but many trades and professional bodies refused to accept women until 1919.",
    1925: "Women could own and run businesses in their own name.",
    1945: "Women ran shops, cafés, hairdressers and farms in their own name.",
    1965: "Banks often wanted a husband's or father's signature before lending a woman money, until a 1975 law stopped this.",
    1990: "The law banned banks from treating women unfairly. Anita Roddick's Body Shop, started in 1976, had become a worldwide chain.",
    2025: "Women run businesses of every kind, though they still get a much smaller share of investors' money than men."
  },
  usa: {
    1850: "Single women and widows could trade. In many states a wife needed a court's permission to run a business in her own name.",
    1880: "More states let wives trade in their own name, but the rules varied from state to state.",
    1900: "Women like Madam C. J. Walker built big businesses, but wives' rights still varied by state and loans were hard to get.",
    1925: "Banks rarely lent money to a woman unless a husband or father signed too.",
    1945: "Women ran many businesses during the war, but banks still rarely lent to them without a man's signature.",
    1965: "A woman often could not get a credit card or loan without her husband's signature, until a 1974 law changed this.",
    1990: "A 1988 law ended rules in some states that made women get a male relative to co-sign a business loan.",
    2025: "Women own about 4 in 10 US businesses."
  },
  russia: {
    1850: "Women, often widows, could register as merchants. But most women were serfs, and a wife needed her husband's permission to travel.",
    1880: "Merchant women ran shops and trading houses, but a wife needed her husband's permission to get a passport.",
    1900: "Some women ran shops, workshops and even factories, but a wife still needed her husband's permission to live and work away from home.",
    1925: "In the early 1920s small private shops were allowed again, for women and men, but this ended by about 1930.",
    1945: "Private businesses were banned for everyone, women and men.",
    1965: "Private businesses were banned for everyone, women and men.",
    1990: "From 1988 people could set up small 'cooperatives', such as cafés and sewing workshops.",
    2025: "Women can own and run any business."
  },
  turkey: {
    1850: "Islamic law let women own shops and property. But many city women traded through male relatives, because they were not expected to deal with men in public.",
    1880: "Women owned property and shops, but usually did business through men in the family.",
    1900: "Women owned property and some ran workshops, but trading in public was mostly men's work.",
    1925: "Women could own businesses, but the law let a husband stop his wife from working.",
    1945: "Women could own businesses, but a husband could legally stop his wife from working (until 1990).",
    1965: "Women could own businesses, but a husband could legally stop his wife from working (until 1990).",
    1990: "From 1990 a wife no longer needed her husband's permission to work or run a business.",
    2025: "Women can own and run any business, though far fewer women than men do."
  },
  china: {
    1850: "Widows sometimes ran the family shop, and village women sold goods at markets. But property belonged to the family, under its male head.",
    1880: "Women sold goods at markets and some ran tea houses or inns, but property belonged to the family.",
    1900: "Women ran small trades, but property and big decisions belonged to the men of the family.",
    1925: "City women opened shops and schools, but daughters rarely inherited, so few had money to start a business.",
    1945: "The 1930 law gave women equal property rights, but in villages custom often won.",
    1965: "Private businesses were banned for everyone, women and men.",
    1990: "From the 1980s people could start private businesses again, and many women opened shops and small factories.",
    2025: "China has more self-made women billionaires than any other country."
  }
};
for (const c in BUSINESS) for (const y in BUSINESS[c]) DATA[c][y].businessNote = BUSINESS[c][y];

// ---------- One-line reasons for the scoreboard ----------
// Keyed by right, then country + year. Squares without an entry get a plain Yes/No line.
const REASONS = {
  vote: {
    uk1880: "Only some unmarried women who paid local taxes could vote, and only in town elections.",
    uk1900: "Some women could vote in local elections, but no woman could vote for Parliament.",
    uk1925: "Women over 30 who met property rules could vote. Younger women had to wait until 1928.",
    usa1880: "Only in Wyoming and Utah territories.",
    usa1900: "Only in four western states: Wyoming, Colorado, Utah and Idaho.",
    china1945: "There were no national elections during the war. Women got the vote in the 1947 constitution.",
    russia1850: "Nobody, woman or man, could vote. Russia was ruled by the tsar.",
    russia1880: "Nobody, woman or man, could vote. Russia was ruled by the tsar.",
    russia1900: "There was no national parliament until 1906, and then only men could vote.",
    russia1945: "Women and men voted, but there was only one party to choose.",
    russia1965: "Women and men voted, but there was only one party to choose.",
    turkey1850: "There was no parliament. The sultan ruled.",
    turkey1880: "A parliament met briefly in 1877–78, elected only by men.",
    turkey1900: "Men voted for an Ottoman parliament from 1908. Women could not.",
    turkey1925: "Women won the vote in local elections in 1930 and national ones in 1934.",
    china1850: "Nobody, woman or man, could vote. China was ruled by an emperor.",
    china1880: "Nobody, woman or man, could vote. China was ruled by an emperor.",
    china1900: "Nobody, woman or man, could vote. China was ruled by an emperor.",
    china1925: "A few provinces let women vote locally, but there was no national vote for women.",
    china1965: "Women and men voted, but there was only one party to choose.",
    china1990: "Women and men voted in local elections, but there was only one party to choose.",
    china2025: "Women and men vote in local elections, but there is only one party to choose."
  },
  property: {
    uk1850: "A wife's property and wages belonged to her husband (coverture).",
    uk1880: "From 1870 wives kept their own wages. Full control of their property came in 1882.",
    usa1850: "It depended on the state. New York let wives keep their property from 1848, but most states did not yet.",
    usa1880: "Many states now let wives keep their property and wages, but not all.",
    russia1850: "Noblewomen kept their own land and money after marrying, but serf women owned almost nothing.",
    russia1880: "Married women kept their own property, but most peasant land belonged to the village and was managed by men.",
    russia1900: "Married women kept their own property, but most peasant land belonged to the village and was managed by men.",
    turkey1850: "Islamic law let wives keep their own property, though daughters inherited half as much as sons.",
    china1850: "Property belonged to the family, under its male head. Daughters usually inherited nothing.",
    china1925: "Courts began giving daughters inheritance rights from 1926, but custom still favoured sons.",
    china1945: "The 1930 Civil Code gave women equal rights, but in villages old customs often won."
  },
  work: {
    uk1850: "Poor women worked in mills and as servants, but professions like law and medicine were closed to women.",
    uk1880: "Women could be teachers, nurses and servants, but most professions were closed to them.",
    uk1900: "New office and shop jobs opened, but law, accountancy and many others stayed closed until 1919.",
    uk1925: "The professions opened in 1919, but many employers sacked women when they married.",
    uk1945: "The marriage bar was ending, but women were paid less and kept out of many senior jobs.",
    uk1965: "Employers could legally refuse to hire women or pay them less, until new laws in 1970 and 1975.",
    usa1850: "Mill work, teaching and service were open to women, but most professions were closed.",
    usa1880: "Some states banned women from being lawyers, and most professions were very hard to enter.",
    usa1900: "Many jobs were for men only, and many employers fired women when they married.",
    usa1925: "Many schools and offices fired women teachers and clerks when they married.",
    usa1945: "The war opened factory jobs to women, but many were pushed out again when the men came home.",
    usa1965: "Newspapers still split job adverts into 'Help Wanted – Male' and 'Help Wanted – Female'.",
    russia1850: "Most women were serfs and could not choose their work at all.",
    russia1880: "A wife needed her husband's permission to take a job away from home.",
    russia1900: "A wife needed her husband's permission to get a passport and work away from home (until 1914).",
    turkey1850: "Women worked on farms and at home, but city women were expected to stay out of public workplaces.",
    turkey1880: "Women worked on farms and at home, but city women were expected to stay out of public workplaces.",
    turkey1900: "A few jobs like teaching and nursing were open to women. Most others were for men.",
    turkey1925: "The new Republic opened jobs to women, but the law let a husband stop his wife from working.",
    turkey1945: "A husband could legally stop his wife from taking a job (until 1990).",
    turkey1965: "A husband could legally stop his wife from taking a job (until 1990).",
    china1850: "Women worked at home and on farms. Respectable women were expected to stay inside the home.",
    china1880: "Women worked at home and on farms. Respectable women were expected to stay inside the home.",
    china1900: "Girls could work in new city mills, but most jobs outside the home were closed to women.",
    china1925: "City women could become teachers, nurses and mill workers, but most professions were still for men.",
    china1945: "More jobs were open, but family and custom usually decided what a woman could do."
  },
  school: {
    uk1850: "No British university accepted women.",
    uk1880: "Women could study at London University and at women's colleges, but Oxford and Cambridge gave them no degrees.",
    uk1900: "Many universities gave women degrees, but Oxford (until 1920) and Cambridge (until 1948) did not.",
    usa1850: "Only a few colleges, like Oberlin, admitted women.",
    usa1880: "Some colleges and the new women's colleges admitted women, but many famous universities did not.",
    russia1850: "Universities were closed to women.",
    russia1880: "Women could attend the Higher Women's Courses, but universities and official degrees were closed to them.",
    russia1900: "There were women's courses and a women's medical institute (1897), but universities were still closed to women.",
    turkey1900: "A few women studied at foreign colleges in Istanbul. The first women's university opened in 1914.",
    china1925: "Peking University admitted women from 1920, but very few girls even finished secondary school.",
    china1945: "Universities were open to women, but war and poverty meant very few could go."
  }
};

// ---------- More careers: scientist and pilot ----------
// [scientist, pilot]: 0 = No, 1 = Rarely, 2 = Yes, null = no aeroplanes yet (first flight 1903)
const MORE_CAREERS = {
  uk:     { 1850: [1, null], 1880: [1, null], 1900: [1, null], 1925: [1, 1], 1945: [2, 1], 1965: [2, 1], 1990: [2, 2], 2025: [2, 2] },
  usa:    { 1850: [1, null], 1880: [1, null], 1900: [1, null], 1925: [1, 1], 1945: [1, 1], 1965: [1, 1], 1990: [2, 1], 2025: [2, 2] },
  russia: { 1850: [0, null], 1880: [1, null], 1900: [1, null], 1925: [2, 1], 1945: [2, 2], 1965: [2, 1], 1990: [2, 1], 2025: [2, 2] },
  turkey: { 1850: [0, null], 1880: [0, null], 1900: [0, null], 1925: [1, 0], 1945: [1, 1], 1965: [2, 1], 1990: [2, 1], 2025: [2, 2] },
  china:  { 1850: [0, null], 1880: [0, null], 1900: [0, null], 1925: [1, 0], 1945: [1, 1], 1965: [2, 1], 1990: [2, 2], 2025: [2, 2] }
};
CAREERS.push({ key: "scientist", label: "Scientist" }, { key: "pilot", label: "Pilot" });
for (const c in MORE_CAREERS) for (const y in MORE_CAREERS[c]) {
  DATA[c][y].careers.scientist = MORE_CAREERS[c][y][0];
  DATA[c][y].careers.pilot = MORE_CAREERS[c][y][1];
}
