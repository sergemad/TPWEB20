DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS film;


CREATE TABLE account (
username VARCHAR(255) ,
usermail VARCHAR(255) ,
password VARCHAR(255) ,
PRIMARY KEY (username));

CREATE TABLE film (
filmid INTEGER ,
filmname VARCHAR(255),
description TEXT,
year VARCHAR(255),
category VARCHAR(255),
last VARCHAR(255),
director VARCHAR(225),
image TEXT,
PRIMARY KEY (filmid));

/* Inserting instances */
INSERT INTO account VALUES('Serge', 'serge@gmail.com', 'secret');
INSERT INTO film VALUES('1', 'ALL EYEZ ON ME', 'En 1995, dans la prison de Dannemora, un réalisateur et son équipe viennent interviewer Tupac Shakur, incarcéré pour quelques mois. Il leur raconte son enfance, sa relation avec sa mère Afeni, ses débuts dans le rap ou encore ses débuts au cinéma.','2017', 'Qui inspire / Qui émeut', '2h 20 min', 'Benny Boom','https://cdn.hmv.com/r/w-1280/hmv/files/c4/c4dfbd96-be7a-41fa-81c4-598d87f96bde.jpg');
INSERT INTO film VALUES('2', 'DJANGO UNCHAINED', ' Un cavalier solitaire s interpose dans la guerre que se livrent un général américain et un aventurier mexicain','1966', 'Qui sort du commun / Qui inspire', '1h 33min', 'Quentin Tarantino','https://fr.web.img6.acsta.net/medias/nmedia/18/90/08/59/20366454.jpg');
INSERT INTO film VALUES('3', 'MAD MAX FURY ROAD', 'Hanté par un lourd passé, Mad Max estime que le meilleur moyen de survivre est de rester seul. Cependant, il se retrouve embarqué par une bande qui parcourt le désert à bord d un véhicule militaire piloté par l Impératrice Furiosa. Ils fuient la Citadelle où sévit le terrible Immortan Joe qui s est fait voler un objet irremplaçable. Enragé, ce Seigneur de guerre envoie ses hommes pour traquer les rebelles impitoyablement...','2015', 'Qui sort du commun / Qui surprend', '2h 0 min', 'GEORGE MILLER','https://fr.web.img3.acsta.net/pictures/15/04/14/18/30/215297.jpg');
INSERT INTO film VALUES('4', 'NOS PIRES VOISINS 2', 'Mac et Kelly Radner, pour l’arrivée de leur deuxième enfant, sont enfin prêts à franchir l’étape ultime vers la vie adulte et déménager en banlieue. Mais alors qu’ils mettent tout en œuvre pour vendre leur maison, une sororité d’étudiantes décomplexées succède à l’ancienne fraternité de Teddy, les surpassant largement en termes de débauche et tapage nocturne. Les jeunes filles de Kapa Nu, Shelby flanquée de ses comparses, Beth et Nora, lassées du sexisme et de la rigidité du système universitaire, ont décidé de faire de leur QG l’antre de la contestation et de la liberté néo féministe. Et le fait que ce soit au cœur d’un quartier calme et résidentiel ne les en empêchera pas. Mac et Kelly avec l’aide de leurs amis Jimmy et Paula, vont transformer leur ancien ennemi juré Teddy, avec son charme et ses coups fourrés, en arme secrète. Sa mission : infiltrer la sororité, la conquérir pour mieux la diviser, la détruire, pour la forcer à déménager.','2016', 'Qui fait rire', '1h 31 min', 'Nicholas Stoller','https://fr.web.img3.acsta.net/pictures/16/04/08/08/52/132511.jpg');
INSERT INTO film VALUES('5', 'ÇA', 'À Derry, dans le Maine, sept gamins ayant du mal à s intégrer se sont regroupés au sein du "Club des Ratés". Rejetés par leurs camarades, ils sont les cibles favorites des gros durs de l école. Ils ont aussi en commun d avoir éprouvé leur plus grande terreur face à un terrible prédateur métamorphe qu ils appellent "Ça"…','2017', 'Qui fait peur', '2h 14 min', 'ANDY MUSCHIETTI','https://fr.web.img6.acsta.net/pictures/17/03/29/14/40/513263.jpg');
INSERT INTO film VALUES('6', 'JOKER', 'Dans les années 1980, à Gotham City, Arthur Fleck, un humoriste de stand-up raté, bascule dans la folie et devient le Joker.','2019', 'Qui fait réfléchir', '2h 02 min', 'Todd phillips','https://images-na.ssl-images-amazon.com/images/I/81YdUDaMiWL._AC_SY445_.jpg');
INSERT INTO film VALUES('7', 'INTOUCHABLES', 'A la suite d’un accident de parapente, Philippe, riche aristocrate, engage comme aide à domicile Driss, un jeune de banlieue tout juste sorti de prison… Bref la personne la moins adaptée pour le job. Ensemble ils vont faire cohabiter Vivaldi et Earth Wind and Fire, le verbe et la vanne, les costumes et les bas de survêtement… Deux univers vont se téléscoper, s’apprivoiser, pour donner naissance à une amitié aussi dingue, drôle et forte qu’inattendue, une relation unique qui fera des étincelles et qui les rendra… Intouchables.','2011', 'Qui donne le sourire', '1h 52 min', 'ERIC TOLEDANO','https://fr.web.img6.acsta.net/medias/nmedia/18/82/69/17/19806656.jpg');
INSERT INTO film VALUES('8', 'INVINCIBLE', 'Vince Papale vient de perdre sa femme et son travail. Grand fan des Eagles, l homme se voit un jour intégrer cette célèbre équipe nationale de football américain. Ses rêves les plus fous se réalisent alors.','2006', 'Qui émeut', '1h 45 min', 'ERICSON CORE','https://fr.web.img5.acsta.net/pictures/20/03/18/15/51/1023638.jpg');
