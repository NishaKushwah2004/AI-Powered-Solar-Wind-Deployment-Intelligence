class FeatureEngineering:

    def create_feature_vector(
        self,
        weather,
        solar,
        solar_metrics,
        wind_metrics,
    ):

        return {
            "temperature": weather.temperature,
            "humidity": weather.humidity,
            "rainfall": weather.rainfall,
            "wind_speed": weather.wind_speed,
            "wind_direction": weather.wind_direction,
            "pressure": weather.pressure,
            "cloud_cover": weather.cloud_cover,
            "ghi": solar.ghi,
            "dni": solar.dni,
            "dhi": solar.dhi,
            "peak_sun_hours": solar_metrics.peak_sun_hours,
            "capacity_factor": solar_metrics.capacity_factor,
            "wind_power_density": wind_metrics.wind_power_density,
        }