/* eslint-disable */
import { fetchWeatherApi } from 'openmeteo';
import { Request, Response } from 'express';
import { ClickHouse } from 'clickhouse';

const clickhouse = new ClickHouse({
    url: process.env.CLICKHOUSE_URL,
    port: 443,
    basicAuth: {
      username: 'default',
      password: process.env.CLICKHOUSE_PW,
    },
    isUseHttps: true,
    format: "json",
});
	
exports.getWeatherData = async (req: Request, res: Response) => {
    const params = {
        latitude: 45.7321,
        longitude: -1.0988,
        current: ["temperature_2m", "relative_humidity_2m", "apparent_temperature", "is_day", "precipitation", "rain", "showers", "snowfall", "weather_code", "cloud_cover", "pressure_msl", "surface_pressure", "wind_speed_10m", "wind_direction_10m", "wind_gusts_10m"],
        minutely_15: ["temperature_2m", "relative_humidity_2m", "dew_point_2m", "apparent_temperature", "precipitation", "rain", "snowfall", "snowfall_height", "freezing_level_height", "sunshine_duration", "weather_code", "wind_speed_10m", "wind_speed_80m", "wind_direction_10m", "wind_direction_80m", "wind_gusts_10m", "visibility", "cape", "lightning_potential", "is_day", "shortwave_radiation", "direct_radiation", "diffuse_radiation", "direct_normal_irradiance", "global_tilted_irradiance", "terrestrial_radiation", "shortwave_radiation_instant", "direct_radiation_instant", "diffuse_radiation_instant", "direct_normal_irradiance_instant", "global_tilted_irradiance_instant", "terrestrial_radiation_instant"],
        hourly: ["temperature_2m", "relative_humidity_2m", "dew_point_2m", "apparent_temperature", "precipitation_probability", "precipitation", "rain", "showers", "snowfall", "snow_depth", "weather_code", "pressure_msl", "surface_pressure", "cloud_cover", "cloud_cover_low", "cloud_cover_mid", "cloud_cover_high", "visibility", "evapotranspiration", "et0_fao_evapotranspiration", "vapour_pressure_deficit", "wind_speed_10m", "wind_speed_80m", "wind_speed_120m", "wind_speed_180m", "wind_direction_10m", "wind_direction_80m", "wind_direction_120m", "wind_direction_180m", "wind_gusts_10m", "temperature_80m", "temperature_120m", "temperature_180m", "soil_temperature_0cm", "soil_temperature_6cm", "soil_temperature_18cm", "soil_temperature_54cm", "soil_moisture_0_to_1cm", "soil_moisture_1_to_3cm", "soil_moisture_3_to_9cm", "soil_moisture_9_to_27cm", "soil_moisture_27_to_81cm", "uv_index", "uv_index_clear_sky", "freezing_level_height", "sunshine_duration"],
        daily: ["weather_code", "temperature_2m_max", "temperature_2m_min", "apparent_temperature_max", "apparent_temperature_min", "sunrise", "sunset", "daylight_duration", "sunshine_duration", "uv_index_max", "uv_index_clear_sky_max", "precipitation_sum", "rain_sum", "showers_sum", "snowfall_sum", "precipitation_hours", "precipitation_probability_max", "wind_speed_10m_max", "wind_gusts_10m_max", "wind_direction_10m_dominant", "shortwave_radiation_sum", "et0_fao_evapotranspiration"],
        timezone: "auto",
        past_days: 92,
        past_hours: 24,
        forecast_days: 16,
        forecast_hours: 24
    };

    const url = "https://api.open-meteo.com/v1/forecast";

    try {
        const weatherData: any = await fetchWeatherApi(url, params);

        for (const record of weatherData) {
            const query = `INSERT INTO weather_data (timestamp, temperature, humidity, ...) VALUES ('${record.timestamp}', ${record.temperature}, ${record.humidity}, ...)`;
            await clickhouse.query(query).toPromise();
        }

        res.status(200).send('Données météorologiques insérées avec succès dans ClickHouse');
    } catch (error) {
        console.error('Erreur lors de la récupération ou de l\'insertion des données météo:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération ou de l\'insertion des données météo' });
    }
}
