-- CreateTable
CREATE TABLE `Book` (
    `id` VARCHAR(36) NOT NULL,
    `description` VARCHAR(250) NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `price` DECIMAL(15, 3) NOT NULL DEFAULT 99.9,

    UNIQUE INDEX `Book_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
