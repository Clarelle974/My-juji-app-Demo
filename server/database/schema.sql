CREATE TABLE `belt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL UNIQUE,
  `rank_order` int NOT NULL,
  `program_description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `belt` (`name`, `rank_order`,`program_description`) VALUES 
('jaune', 1, 'Maîtrise d\'un ensemble de techniques.\n Apprentissage des 3 premières techniques du Kodokan Goshin Jutsu.\n Réponse libre aux attaques A1, B1, C1 des 20 imposées'), ('orange', 2, 'Maîtrise d\'un ensemble de techniques.\n Apprentissage des 7 premières techniques du Kodokan Goshin Jutsu.\n Réponse libre aux deux premières attaques des séries A,B,C des 20 imposées'), ('verte', 3, 'Maîtrise d\'un ensemble de techniques.\n Apprentissage des 10 premières techniques du Kodokan Goshin Jutsu.\n Réponse libre aux 3 premières attaques des séries A, B,C des 20 imposées'), ('bleue', 4, 'à venir'), ('marron', 5, 'à venir'), ('noire', 6, 'à venir');

CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `role` (`name`) VALUES 
('applicant'), ('admin');

CREATE TABLE `member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL UNIQUE,
  `belt_id` int DEFAULT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `role_id` int DEFAULT 1,
  PRIMARY KEY (`id`),
  CONSTRAINT `member_ibfk_1` FOREIGN KEY (`belt_id`) REFERENCES `belt` (`id`) ON DELETE SET NULL,
  CONSTRAINT `member_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `member` (`name`, `email`, `hashed_password`, `role_id`, `belt_id`) VALUES 
('Clarelle', '974clarelle@gmail.com', '$argon2id$v=19$m=19456,t=2,p=1$FeTxjw51Izj8xgP9AjbQ7g$rIxXQNQMSUUz9WXr5wW8BPAiZT8IcGNvr6xkYaPxnr4', 2, 2);

CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(90) NOT NULL UNIQUE,
  `signification` varchar(90) NOT NULL,
  `slug` varchar(100) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `category` (`name`,`slug`,`signification`) VALUES 
('ukemi', 'ukemi', 'chutes'), ('atemi', 'atemi', 'coups'), ('uke waza','uke-waza','parades'), ('tachi-waza', 'tachi-waza', 'techniques debout'), ('ne-waza','ne-waza', 'techniques au sol'), ('dori-waza', 'dori-waza', 'saisies');

CREATE TABLE `technique` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL UNIQUE,
  `signification` varchar(255),
  `description` text,
  `category_id` int,
  `belt_id` int,
  PRIMARY KEY (`id`),
  CONSTRAINT `technique_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE SET NULL,
  CONSTRAINT `technique_ibfk_2` FOREIGN KEY (`belt_id`) REFERENCES `belt` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `technique` VALUES (1,'Ushiro Ukemi','Chute arrière','Technique de chute vers l\'arrière',1,1),(2,'Mae Ukemi','Chute avant','Technique de chute vers l\'avant',1,1),(3,'Oi Tsuki','Coup de poing direct avancé','Explication détaillée',2,1),(4,'Gyaku Tsuki','Coup de poing direct opposé','Explication détaillée',2,1),(5,'Mawashi Tsuki','Coup de poing circulaire','Explication détaillée',2,1),(8,'Gedan Barai','Parade basse','Explication détaillée',3,1),(9,'Jodan Age Uke','Parade haute','Explication détaillée',3,1),(10,'Soto Uke','Parade extérieure','Explication détaillée',3,1),(12,'O Goshi','Grande hanche','Explication détaillée',4,1),(13,'O Soto Gari','Grand fauchage extérieur','Explication détaillée',4,1),(14,'O Uchi Gari','Grand fauchage intérieur','Explication détaillée',4,1),(15,'Yoko Shio Gatame','Immobilisation latérale','Explication détaillée',5,1),(16,'Juji Gatame','Clé de bras en croix','Explication détaillée',5,1),(17,'Te Kubi Osae','Contrôle du poignet','Explication détaillée',5,1),(18,'Kibisu Gatame','Clé du talon','Explication détaillée',5,1),(19,'Ryote dori','prise des poignets','prise des deux poigntes et hiza-geri au bas ventre dans le Kodokan',6,1),(20,'Hidari eri dori','prise du col gauche de la main droite','la saisie se fait en poussant dans le Kodokan',6,1),(21,'Katate Dori','saisie du poignet à deux mains','saisie utilisées dans les 20 attaques imposées',6,1),(22,'Mae Dori','saisie de face','saisie de face en ceinturant sous les bras, dans les 20 attaques imposées',6,1),(23,'Migi eri dori','Saisie du revers droit ','avec la main droite',6,1),(28,'Uchi uke','défense par l\'intérieur','blocage avec l\'avant-bras qui dévie une attaque de l\'intérieur vers l\'extérieur',3,2),(32,'Kote Gaeshi','Torsion du poignet','Contrôle du poignet de UKE en effectuant un taï-sabaki, puis torsion du poignet de UKE (pouces sur le dos de la main). ',4,2),(33,'Uki Goshi ','hanche flottante','TORIi ouvre la manche vers le haut et l’avant, puis pose sa main à plat dans le dos de UKE pour le plaquer contre lui.  TORI projette UKE  par une rotation du corps. ',4,2),(34,'Kata Gatame','Contrôle par l\'épaule','TORI se place perpendiculairement à UKE. Une jambe reste tendue en arrière, en appui. TORI repousse le bras de UKE qui est de son côté contre son visage, et maintien la position en crochetant ses mains, paume contre paume. ',5,2),(35,'Waki Gatame','contrôle par l\'aisselle','TORI verrouille l’articulation du coude avec l’aisselle, tout en maintenant le poignet de l’adversaire avec ses  deux mains',5,2),(36,'Ude Gatame','clé de bras par les bras','S\'applique avec les mains en aplliquant une torsion sur le coude.',5,2),(38,'Kata Ude Dori','prise du poignet droit et appui sur le coude','',6,2),(39,'Ushiro Eri Dori','Saisie du col par l\'arrière','',6,2),(40,'Ushiro Jime','étranglement par l\'arrière','',6,2),(41,'Kakae Dori ','ceinture par l\'arrière','',6,2),(42,'Eri Dori','Saisie croisée du revers','',6,1),(43,'Yoko Dori','Saisie de côté en ceinturant par les bras','',6,2),(44,'Shudan Gyaku Tsuki','coup de poing direct au plexus','',2,2);

CREATE TABLE `technique_note` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `technique_id` int NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `note_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE,
  CONSTRAINT `note_ibfk_2` FOREIGN KEY (`technique_id`) REFERENCES `technique` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  INSERT INTO `technique_note` (`member_id`, `technique_id`, `content`)
VALUES (1, 1, 'test de visibilité de note technique.');

CREATE TABLE `kodokan_kata` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rank_order` int NOT NULL,
  `defense` TEXT NOT NULL,
  `technique_id` int DEFAULT NULL,
  `belt_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `kodokan_kata_ibfk_1` FOREIGN KEY (`belt_id`) REFERENCES `belt` (`id`) ON DELETE SET NULL,
  CONSTRAINT `kodokan_kata_ibfk_2` FOREIGN KEY (`technique_id`) REFERENCES `technique` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `kodokan_kata` VALUES (1,1,'Ryote dori de UKE puis atemi du genou, TORI esquive et déséquilibre UKE en tirant vers l\'arrière, shuto à la tempe puis kote hineri',19,1),(2,2,'TORI accentue la poussée en reculant, atemi au visage avec le dos de la main, kote hineri puis te gatame',20,1),(3,3,'UKE fait migi eri dori et tracte en reculant la jambe gauche. TORI bloque la main de UKE et donne un uppercut. Il exécute KOTE GAESHI avec ses deux mains, en pivotant.',23,1),(4,4,'Sur le 3°pas, TORI maintient UKE, frappe yoko geri au genou et effectue waki gatame après un déplacement en diagonale ',38,2);

CREATE TABLE `kodokan_note` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `kata_id` int NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `kodokan_note_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE,
  CONSTRAINT `kodokan_note_ibfk_2` FOREIGN KEY (`kata_id`) REFERENCES `kodokan_kata` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `kodokan_note` (`member_id`, `kata_id`, `content`)
VALUES (1, 1, 'test de visibilité de note kodokan.');

CREATE TABLE `twenty_attacks_kata` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rank_order` VARCHAR(2) NOT NULL,
  `defense` TEXT NOT NULL,
  `technique_id` int DEFAULT NULL,
  `belt_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `twenty_attacks_kata_ibfk_1` FOREIGN KEY (`belt_id`) REFERENCES `belt` (`id`) ON DELETE SET NULL,
  CONSTRAINT `twenty_attacks_kata_ibfk_2` FOREIGN KEY (`technique_id`) REFERENCES `technique` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `twenty_attacks_kata` VALUES (1,'A1','réponse libre ou imposée',21,1),(2,'B1','réponse libre ou imposée',22,1),(4,'A2','réponse libre ou imposée',42,2),(6,'C2','réponse libre ou imposée',44,2);

CREATE TABLE `twenty_attacks_note` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `kata_id` int NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `twenty_attacks_note_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE,
  CONSTRAINT `twenty_attacks_note_ibfk_2` FOREIGN KEY (`kata_id`) REFERENCES `twenty_attacks_kata` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `twenty_attacks_note` (`member_id`, `kata_id`, `content`)
VALUES (1, 1, 'test de visibilité de note 20.');
