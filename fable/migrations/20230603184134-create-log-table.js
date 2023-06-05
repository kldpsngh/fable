module.exports = {
    up: async (queryInterface) => {
        await queryInterface.sequelize.query(
            ` create table log_history (
                id uuid not null,
                log_id int,
                created_date date not null default current_date,
                unix_ts bigint,
                user_id int,
                event_name varchar(255),
                primary key (id,created_date,event_name)
            ) partition by range(created_date);
            `
        );

        await queryInterface.sequelize.query(
            `create table log_history_2023_1 partition of log_history
                for values from ('2023-01-01') to ('2023-06-30')
                partition by list (event_name);
            `
        );

        await queryInterface.sequelize.query(
            `create table log_history_2023_1_login partition of log_history_2023_1
            for values in ('login');`
        );

        await queryInterface.sequelize.query(
            `create table log_history_2023_1_logout partition of log_history_2023_1
            for values in ('logout');`
        );

        await queryInterface.sequelize.query(
            `create table log_history_2023_1_default partition of log_history_2023_1 default;
            `
        );

        await queryInterface.sequelize.query(`
            create table log_history_2022_2 partition of log_history
            for values from ('2022-07-01') to ('2022-12-31')
            partition by list (event_name);
        `);

        await queryInterface.sequelize.query(
            `create table log_history_2022_2_login partition of log_history_2022_2
            for values in ('login');`
        );

        await queryInterface.sequelize.query(`
            create table log_history_2022_2_logout partition of log_history_2022_2
            for values in ('logout');
        `);

        await queryInterface.sequelize.query(`
            create table log_history_2022_2_default partition of log_history_2022_2 default;
        `);
    },

    down: async (queryInterface) => {
        await queryInterface.sequelize.query(`drop table log_history`);
    }
};
