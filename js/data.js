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
  { id: "russia", name: "Russia",         skin: "#f3d6bd", hair: "#7a5434" },
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
