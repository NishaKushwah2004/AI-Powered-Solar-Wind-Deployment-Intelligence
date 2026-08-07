from app.prediction.features.solar_feature import SolarFeatures
from app.prediction.features.wind_feature import WindFeatures
from app.prediction.models.prediction_input import PredictionInput


class FeatureEngineering:
    """
    Converts environmental data into
    ML-ready feature vectors.
    """

    def build_solar_features(
        self,
        data: PredictionInput,
    ) -> SolarFeatures:

        weather = data.weather
        solar = data.solar
        gis = data.gis

        return SolarFeatures(
            ghi=solar.ghi or 0,
            dni=solar.dni or 0,
            dhi=solar.dhi or 0,
            peak_sun_hours=(solar.ghi or 0) / 1000,
            temperature=weather.temperature,
            cloud_cover=weather.cloud_cover or 0,
            humidity=weather.humidity,
            elevation=gis.elevation if gis else 0,
            vegetation_index=(
                gis.vegetation_index
                if gis and gis.vegetation_index is not None
                else 0
            ),
            land_slope=(
                gis.land_slope
                if gis and gis.land_slope is not None
                else 0
            ),
        )

    def build_wind_features(
        self,
        data: PredictionInput,
    ) -> WindFeatures:

        weather = data.weather
        gis = data.gis

        return WindFeatures(
            wind_speed=weather.wind_speed,
            wind_direction=weather.wind_direction,
            pressure=weather.pressure,
            temperature=weather.temperature,
            humidity=weather.humidity,
            elevation=gis.elevation if gis else 0,
            land_slope=(
                gis.land_slope
                if gis and gis.land_slope is not None
                else 0
            ),
            vegetation_index=(
                gis.vegetation_index
                if gis and gis.vegetation_index is not None
                else 0
            ),
        )